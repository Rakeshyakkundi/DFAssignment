public with sharing class AccountDetailList {
    @AuraEnabled(cacheable=true)
    public static List<Account> getDetailInfo(){
        List<Account> accListD;
        try {

            accListD = [SELECT Id, Name , Industry,Phone FROM Account];
            return accListD;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}
