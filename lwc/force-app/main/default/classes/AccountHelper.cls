public with sharing class AccountHelper 
{
    
        
            @AuraEnabled(cacheable=true)
            public static List<Account> getAccountList() {
                return [SELECT Id, Name, Type,Phone,(SELECT Id,Name FROM Contacts)
                    FROM Account];
            }

            @AuraEnabled(cacheable=true)
           public static List<Contact> GetContacts(String AccId) {
            return [SELECT Name FROM Contact WHERE AccountId = :AccId];
               }
            
           
            
        

    
}