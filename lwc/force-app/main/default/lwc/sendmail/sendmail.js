import { LightningElement } from 'lwc';
import SendMail from '@salesforce/apex/SendMail.Send';
export default class Sendmail extends LightningElement {

    sendMail(){
        SendMail()
        .then(result =>{
            alert(result);
        })
        .catch(error =>{
            this.error=error;
           console.log('unable to delete the record due to'+JSON.stringify(this.error));
        })
    }
}