import { LightningElement,api } from 'lwc';

export default class FindId extends LightningElement {
    @api recordId;
    connectedCallback(){
        console.log(this.recordId);
    }
}