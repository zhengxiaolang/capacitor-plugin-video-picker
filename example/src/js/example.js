import { VideoPicker } from 'capacitor-plugin-video-picker';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    VideoPicker.echo({ value: inputValue })
}
