public class MyFirstComponentController {

	@AuraEnabled
	public static String getHelloWorld(String name){
		return 'Hello World, ' + name + '!';
	}
}