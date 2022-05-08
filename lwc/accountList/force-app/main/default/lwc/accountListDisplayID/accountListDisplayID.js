import { LightningElement,track,wire } from 'lwc';
import getAccountDetailList from '@salesforce/apex/AccountDetailList.getDetailInfo';
import fetchAccountDetail from '@salesforce/apex/GetQueryAccount.AccountDetailInfo';


export default class AccountListDisplayID extends LightningElement {
   
    get accountList(){
        return JSON.stringify(this.accountData1);
    }
    @wire(getAccountDetailList,{})
    accountData1; 
    @track name;
    queryInfo(event){
        this.name = event.target.value;
    }



    accountSingle='Enter Name here';
    @track accountListSingle=[];
    
    @wire(fetchAccountDetail,{name :'$accountSingle'})
    singleDetailAccount({error,data}){
        if(data){
            this.accountListSingle =data;
        }
        else if(error){

        }
    }
    handelKeyChange(event){
        this.accountSingle = event.target.value;
    }



    

  
}