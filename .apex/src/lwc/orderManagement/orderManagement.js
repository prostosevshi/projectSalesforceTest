import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';

export default class OrderManagement extends LightningElement {
    @api recordId;

    accountName;
    accountNumber;

    typeOptions = [
        { label: 'All Types', value: '' },
        { label: 'Type 1', value: 'Type 1' },
        { label: 'Type 2', value: 'Type 2' },
        { label: 'Type 3', value: 'Type 3' }
    ];
    familyOptions = [
        { label: 'All Families', value: '' },
        { label: 'Family 1', value: 'Family 1' },
        { label: 'Family 2', value: 'Family 2' },
        { label: 'Family 3', value: 'Family 3' }
    ];
    selectedType = '';
    selectedFamily = '';
    searchTerm = '';

    @track products = [];
    @track cart = []; // Корзина

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD, ACCOUNT_NUMBER_FIELD] })
    wiredAccount({ error, data }) {
        if (data) {
            this.accountName = data.fields.Name.value;
            this.accountNumber = data.fields.AccountNumber.value;
        } else if (error) {
            console.error('Error fetching account data:', error);
        }
    }

    connectedCallback() {
        this.loadProducts();
    }

    loadProducts() {
        getProducts({ type: this.selectedType, family: this.selectedFamily, searchTerm: this.searchTerm })
            .then(result => {
                this.products = result;
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    handleTypeChange(event) {
        this.selectedType = event.detail.value;
        this.loadProducts();
    }

    handleFamilyChange(event) {
        this.selectedFamily = event.detail.value;
        this.loadProducts();
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value;
        this.loadProducts();
    }

    handleShowDetails(event) {
        const productId = event.target.dataset.id;
        console.log('Show details for product:', productId);
    }

    handleAddToCart(event) {
        const productId = event.target.dataset.id;
        const product = this.products.find(p => p.Id === productId);

        if (product) {
            this.cart.push(product);
            console.log('Added to cart:', product);

            // Показать Toast сообщение
            const toastEvent = new ShowToastEvent({
                title: 'Success',
                message: `${product.Name} has been added to the cart.`,
                variant: 'success'
            });
            this.dispatchEvent(toastEvent);
        }
    }
}
