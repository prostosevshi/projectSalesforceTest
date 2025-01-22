import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OrderForm extends LightningElement {
    isSuccess = false;

    handleSuccess(event) {
        const orderId = event.detail.id;

        const toastEvent = new ShowToastEvent({
            title: "Success",
            message: `Order created successfully! Order ID: ${orderId}`,
            variant: "success",
        });
        this.dispatchEvent(toastEvent);

        this.isSuccess = true;
    }
}
