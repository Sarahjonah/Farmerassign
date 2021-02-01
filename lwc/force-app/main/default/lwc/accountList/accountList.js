import { LightningElement, wire,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';


export default class AccountList extends NavigationMixin(LightningElement) {
    
    @wire(getAccountList) accounts;
     @api getAccId;
     @api error
     activeSections = ['A'];
    activeSectionsMessage = '';

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }}
   
    handleChangeRadio(event){        
        this.getAccId = event.target.value;
        
}

navigateToAccountPage() {
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: this.getAccId,
            objectApiName: 'Account',
            actionName: 'view'
        }
    });
}
    deleteAccountRecord(event){
        deleteRecord(this.getAccId)
        .then(() => {
            return refreshApex(this.accounts);
        })
        .catch((error) => {
           this.error=error;
           console.log('unable to delete the record due to'+JSON.stringify(this.error));
        });
    }
    }