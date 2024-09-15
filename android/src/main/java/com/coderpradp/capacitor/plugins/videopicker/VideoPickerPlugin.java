package com.coderpradp.capacitor.plugins.videopicker;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.OpenableColumns;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.FileUtils;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

@CapacitorPlugin(name = "VideoPicker")
public class VideoPickerPlugin extends Plugin {

    @PluginMethod
    public void pick(PluginCall call) {
        try {
            Intent intent = new Intent(Intent.ACTION_PICK);
            intent.setType("video/*");
            intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false);
            intent = Intent.createChooser(intent, "");

            startActivityForResult(call, intent, "pickVideosResult");
        } catch (Exception ex) {
            String message = ex.getMessage();
            call.reject(message);
        }
    }

    @ActivityCallback
    private void pickVideosResult(PluginCall call, ActivityResult result) {
        if (call == null) {
            return;
        }

        Intent data = result.getData();
        Context context = getBridge().getActivity().getApplicationContext();

        JSArray files = new JSArray();
        if (result.getResultCode() == Activity.RESULT_OK && data != null) {
            if (data.getClipData() != null) {
                for (int i = 0; i < data.getClipData().getItemCount(); i++) {
                    Uri uri = data.getClipData().getItemAt(i).getUri();
                    files.put(getCopyFilePath(uri, context));
                }
            } else {
                Uri uri = data.getData();
                files.put(getCopyFilePath(uri, context));
            }

            JSObject ret = new JSObject();
            ret.put("files", files);

            call.resolve(ret);
        } else if (result.getResultCode() == Activity.RESULT_CANCELED) {
            call.reject("canceled");
        }
    }

    private JSObject getCopyFilePath(Uri uri, Context context) {
        Cursor cursor = context.getContentResolver().query(uri, null, null, null, null);
        if (cursor == null) {
            return null;
        }

        int nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
        if (!cursor.moveToFirst()) {
            cursor.close();
            return null;
        }

        String name = cursor.getString(nameIndex);
        File file = new File(context.getCacheDir(), name);

        try {
            InputStream inputStream = context.getContentResolver().openInputStream(uri);
            FileOutputStream outputStream = new FileOutputStream(file);
            int read;
            int maxBufferSize = 1024 * 1024;
            int bufferSize = Math.min(inputStream.available(), maxBufferSize);
            final byte[] buffers = new byte[bufferSize];
            while ((read = inputStream.read(buffers)) != -1) {
                outputStream.write(buffers, 0, read);
            }
            inputStream.close();
            outputStream.close();
        } catch (Exception e) {
            return null;
        } finally {
            cursor.close();
        }

        Uri fileUri = Uri.fromFile(file);

        JSObject result = new JSObject();
        result.put("path", fileUri);
        result.put("webPath", FileUtils.getPortablePath(context, bridge.getLocalUrl(), fileUri));
        result.put("name", name);
        result.put("extension", name.substring(name.lastIndexOf('.') + 1).toLowerCase());

        return result;
    }
}
