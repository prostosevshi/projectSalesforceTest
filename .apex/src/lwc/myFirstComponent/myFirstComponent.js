import { LightningElement, track } from 'lwc';
import getHelloWorld from '@salesforce/apex/MyFirstComponentController.getHelloWorld';

export default class MyFirstComponent extends LightningElement {

    @track greeting;

    connectedCallback() {
        getHelloWorld({ name: 'Seva' })  // Параметр с именем 'name'
            .then(result => {
                this.greeting = result;
            })
            .catch(error => {
                console.log(error);
            });
    }
}