public with sharing class GetQueryAccount {
    @AuraEnabled(cacheable=true)
    public static List<Account> AccountDetailInfo(String name){
        List<Account> accListDet;
        String keyQuery = '%'+name+'%';
        try {

            accListDet = [SELECT Id, Name , Industry,Phone FROM Account WHERE name Like:keyQuery];
            return accListDet;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
