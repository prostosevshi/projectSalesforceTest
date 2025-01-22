public with sharing class ProductController {
	@AuraEnabled(cacheable=true)
	public static List<Product__c> getProducts(String type, String family, String searchTerm) {

		String query = 'SELECT Id, Name, Description__c FROM Product__c WHERE Name != NULL';

		if (type != null && type != '') {
			query += ' AND Type__c = :type';
		}
		if (family != null && family != '') {
			query += ' AND Family__c = :family';
		}
		if (searchTerm != null && searchTerm != '') {
			String searchValue = '%' + searchTerm + '%';
			query += ' AND (Name LIKE :searchValue OR Description__c LIKE :searchValue)';
		}

		return Database.query(query);
	}
}
