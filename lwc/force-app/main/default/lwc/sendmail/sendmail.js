import { LightningElement,api,track} from 'lwc';
import SendMail from '@salesforce/apex/SendMail.Send';
export default class Sendmail extends LightningElement {
@api recordId;
@track id;

    sendMail(){
       
        SendMail({accid: this.recordId})
        .then(result =>{
            alert(result);
        })
        .catch(error =>{
            this.error=error;
           console.log('mail not sent'+JSON.stringify(this.error));
        })
       
    }
   
}