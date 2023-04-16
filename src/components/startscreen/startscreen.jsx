import { Component } from "react";
import MainApplication from "../main/main";


class Startscreen extends Component {
    constructor(props) {
        super(props);
        this.STORAGEKEY = "augenschoner-ls-settings";

        this.seiteLaden = this.seiteLaden.bind(this);
        this.updateSelection = this.updateSelection.bind(this);
        this.loadFromStorage = this.loadFromStorage.bind(this)
        
        this.state = {
            site: "startscreen",
            storage: {
                allowNotifications: false,
                useSounds: false,
                workTime: 20,
                breakTime: 30,
            }
        }

        this.loadFromStorage()
    }
    render() {
        if(this.state.site === "startscreen") {
            return (
                <center>
                    <h1>Klicke um zu starten!</h1>
                    <button onClick={this.seiteLaden} id="open-app">Start</button>
                    <button onClick={this.seiteLaden} id="open-settings">Einstellungen</button>
                </center>
            )
        } 
        else if (this.state.site === "app") {
            return (
                <MainApplication 
                allowNotifications={this.state.storage.allowNotifications}
                useSounds={this.state.storage.useSounds}
                workTime={this.state.storage.workTime}
                breakTime={this.state.storage.breakTime}
                />
            )
        }
        else if (this.state.site === "settings") {
            return (
                <center>
                    <h1>Einstellungen</h1>
                    <p>Passe deinen Augenschoner an!</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>Systemnachrichten aktivieren</td>
                                <td>
                                    <input type="checkbox" name="" id="allowNotifications" onChange={this.updateSelection} className="input-settings" checked={this.state.storage.allowNotifications}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Sound aktivieren</td>
                                <td>
                                    <input type="checkbox" name="" id="useSounds" onChange={this.updateSelection} className="input-settings"checked={this.state.storage.useSounds}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Arbeitszeit <small>(Standart: 20 Minuten)</small></td>
                                <td>
                                    <input type="number" name="" id="worktime" onChange={this.updateSelection} className="input-settings" value={this.state.storage.workTime || 20}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Pausendauer <small>(Standart: 30 Sekunden)</small></td>
                                <td>
                                    <input type="number" name="" id="breaktime" onChange={this.updateSelection} className="input-settings" value={this.state.storage.breakTime || 30}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </center>
            )
        }
    }
    seiteLaden(ev) {
        let siteClick = ev.target.id.slice(5);
        console.log(siteClick)
        this.setState({
            site: siteClick
        })
    }
    loadFromStorage() {
        if(window.localStorage.getItem(this.STORAGEKEY)) {
            let storageData = JSON.parse(window.localStorage.getItem(this.STORAGEKEY));

            this.state.storage.allowNotifications = storageData?.storage?.allowNotifications;
            this.state.storage.useSounds = storageData?.storage?.useSounds;
            this.state.storage.workTime = parseInt(storageData?.storage?.workTime) || 20;
            this.state.storage.breakTime = parseInt(storageData?.storage?.breakTime) || 30;

            // this.setState({
            //     storage: {
            //         allowNotifications: storageData?.settings?.allowNotifications,
            //         useSounds: storageData?.settings?.useSounds,
            //         workTime: storageData?.settings?.workTime,
            //         breakTime: storageData?.settings?.breakTime,
            //     }
            // })
        }
    }
    updateSelection(event) {
        if(event.target.id === "allowNotifications" && event.target.checked == true) {
            try {
                Notification.requestPermission().then(answer =>{
                    if(answer === "granted") this.setState({storage: {allowNotifications : true}});
                    else {
                        this.setState({storage: {allowNotifications : false}});
                        window.alert("Systemnachrichten können nicht gesendet werden!")
                    };
                })
            } catch (err) {
                this.setState({storage: {allowNotifications : false}});
                window.alert("Systemnachrichten können nicht gesendet werden!");
                throw new Error(err);
            }
            
        }
        this.setState({
            storage: {
                allowNotifications : document.querySelector("#allowNotifications").checked,
                useSounds : document.querySelector("#useSounds").checked,
                workTime : document.querySelector("#worktime").value,
                breakTime : document.querySelector("#breaktime").value,
            }
        }, () => {
            window.localStorage.setItem(this.STORAGEKEY ,JSON.stringify(this.state))
        })
    }
}
export default Startscreen