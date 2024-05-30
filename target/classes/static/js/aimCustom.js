/**
 * Participants
 */
 /*
 function deleteParticipant(that){
	
	var id=$(that).attr('id');
	var url='/participants/delete/ajax?participantId='+id;
	$.getJSON({
    	url: url
	}).done(function (result, status, xhr) {
	   $(that).closest('tr').remove()
	   $('.modal').modal('hide');
	}).fail(function (xhr, status, error) {
	    alert("Error deleting participant:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText)
	});
	
}*/

function openDetailDialog(that) {
	var id = $(that).attr('id');
	
	var url = contextpath+"participants/details/ajax?participantId=" + id;
	
	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
		$("#part_id"+id).val(data.participantId);
		$("#partTypeId"+id).val(data.participantTypeId);
		$("#part_desc"+id).val(data.participantDescription);
		$("#part_address_1"+id).val(data.participantAddress);
		$("#partCountry"+id).val(data.participantCountry);
		$("#part_city"+id).val(data.participantCity);
		$("#part_default_curr_code"+id).val(data.participantDefaultCurrencyId);
					
	}).fail(function (xhr, status, error) {
		$("#resp"+id).html("<p class='alert alert-danger'>Error retrieving data: "+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		
	});	
}


function checkIfGroupHasUsers(groupId) {
	var url = contextpath+"rolegroups/users/ajax?groupId=" + groupId;

	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
			if(xhr.status==200)
			{
				if(data.length==0)
				 	$("#deleteModal"+groupId).modal('show');
				else
				{
					$("#resp"+groupId).html("<p>Role group cannot be deleted: Other users belong to this role group.</p>");
					$("#errorModal"+groupId).modal('show');
				}
			}
			else
			{
				$("#resp"+groupId).html("<p>Error: "+status+"</p>");
				$("#errorModal"+groupId).modal('show');
			}
					
	}).fail(function (xhr, status, error) {
		//$("#resp"+id).html("<p class='alert alert-danger'>Error deleting participant:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#resp"+groupId).html("<p class='alert alert-danger'>Error deleting participant:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#errorModal"+groupId).modal('show');

	});	
}


function checkIfBranchHasDevice(partId, branchId) {
	
	var url = contextpath+"branch/deviceslist/ajax?partId=" + partId + "&branchId="+branchId;
	
	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
		
			if(xhr.status==200)
			{
				if(data.length==0)
					
				 	$("#deleteModal"+branchId).modal('show');
				else
				{
					$("#resp"+branchId).html("<p>Branch cannot be deleted: Device are defined under this Branch.</p>");
					$("#errorModal"+branchId).modal('show');
				}
			}
			else
			{
				$("#resp"+branchId).html("<p>Error: "+status+"</p>");
				$("#errorModal"+branchId).modal('show');
			}
					
	}).fail(function (xhr, status, error) {
		//$("#resp"+id).html("<p class='alert alert-danger'>Error deleting participant:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#resp"+branchIdpartId).html("<p class='alert alert-danger'>Error deleting branch:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#errorModal"+branchId).modal('show');

	});	
}

function checkIfPartHasServiceList(partId) {
	var url = contextpath+"participants/servicelists/ajax?participantId=" + partId;
	
	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
		
			if(xhr.status==200)
			{
				if(data.length==0)
				 	$("#deleteModal"+partId).modal('show');
				else
				{
					$("#resp"+partId).html("<p>Participant cannot be deleted: Service lists are defined under this participant.</p>");
					$("#errorModal"+partId).modal('show');
				}
			}
			else
			{
				$("#resp"+partId).html("<p>Error: "+status+"</p>");
				$("#errorModal"+partId).modal('show');
			}
					
	}).fail(function (xhr, status, error) {
		//$("#resp"+id).html("<p class='alert alert-danger'>Error deleting participant:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#resp"+partId).html("<p class='alert alert-danger'>Error deleting participant:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#errorModal"+partId).modal('show');

	});	
}

/*
function checkIfServiceListHasDevCat(servListId) {
	var url = contextpath+"devicelistservices/devicecategories/ajax?servListId=" + servListId;

	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
			if(xhr.status==200)
			{
				if(data.length==0)
				 	$("#deleteModal"+servListId).modal('show');
				else
				{
					$("#resp"+servListId).html("<p>Service List cannot be deleted: Device categories are related to this service list.</p>");
					$("#errorModal"+servListId).modal('show');
				}
			}
			else
			{
				$("#resp"+servListId).html("<p>Error: "+status+"</p>");
				$("#errorModal"+servListId).modal('show');
			}
					
	}).fail(function (xhr, status, error) {
		//$("#resp"+id).html("<p class='alert alert-danger'>Error deleting participant:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#resp"+servListId).html("<p class='alert alert-danger'>Error deleting service list:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#errorModal"+servListId).modal('show');

	});	
}
*/

function checkIfDevCatHasDevices(devCatId, devCatPartId){
	var url = contextpath+"devicecategories/devices/ajax?devCatId="+devCatId+"&devCatPartId="+devCatPartId;

	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
			if(xhr.status==200)
			{
				if(data.length==0)
				 	$("#deleteModal"+devCatId+devCatPartId).modal('show');
				else
				{
					$("#resp"+devCatId+devCatPartId).html("<p>Device Category cannot be deleted: Devices are defined under this device category.</p>");
					$("#errorModal"+devCatId+devCatPartId).modal('show');
				}
			}
			else
			{
				$("#resp"+devCatId+devCatPartId).html("<p>Error: "+status+"</p>");
				$("#errorModal"+devCatId+devCatPartId).modal('show');
			}
					
	}).fail(function (xhr, status, error) {
		//$("#resp"+id).html("<p class='alert alert-danger'>Error deleting participant:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#resp"+devCatId+devCatPartId).html("<p class='alert alert-danger'>Error deleting device category:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		$("#errorModal"+devCatId+devCatPartId).modal('show');

	});	
	
}

function updateServiceListDesc(servPartId,servListId){
	
	var servListDesc =$("#update_serv_list_desc"+servPartId+servListId).val();
	var url = contextpath+"devicelistservices/update/service/description/ajax?servPartId=" + servPartId+"&servListId="+servListId+"&servListDesc="+servListDesc;

	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
		if(xhr.status==200){
			$("#resp"+servPartId+servListId).html("<p class='alert alert-success'>"+data.resp+"</p>");
			$("#serv_list_desc"+servPartId+servListId).html(servListDesc);
			$('#updateServiceDescModal'+servPartId+servListId).modal('hide');
			
			$("#form1").submit();
			
		}
		else
			$("#resp"+servPartId+servListId).html("<p class='alert alert-danger'>"+ status  + " " + xhr.status + " " + xhr.statusText+"</p>");

					
	}).fail(function (xhr, status, error) {
		$("#resp"+servPartId+servListId).html("<p class='alert alert-danger'>Error saving service list description:"+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		
	});	
}

/*
function openAddServiceDialog() {

	var partId=$("#servPartId").val();
	var servListId=$("#servListId").val();
	var url = "/devicelistservices/servicelist/service/ajax?participantId="+partId+"&servListId="+servListId;
	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
		$("#selectServiceName").empty();
		//$("#selectServiceName").append($("<option value='-1' >Select Service</option>"));
		$.each(data, function(key,val) {   
          
  			$("#selectServiceName").append($("<option value='"+val.codeValue+"' >"+val.codeValue+"</option>"));
        });
        $("#selectServiceName").selectpicker('render');
        $("#selectServiceName").selectpicker('refresh');

		$("#selectServiceName").val('');
		
	}).fail(function (xhr, status, error) {
		$("#resp").html("<p class='alert alert-danger'>Error getting services: "+ status + " " + error + " " + xhr.status + " " + xhr.statusText+"</p>");
		
	});	
}*/

function getBranchesForParticipant(that,controlId,defaultDesc)
{
	var url = contextpath+"participants/branches/ajax?";

	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
		

		
		$("#"+controlId).empty();
		if(defaultDesc=='ALL')
			$("#"+controlId).append($("<option value='ALL' >All Branches</option>"));
		
		$.each(data, function(key,val) {  
			          
  			$("#"+controlId).append($("<option value='"+val.branchId+"' >"+val.branchName+"</option>"));
        });
	}).fail(function (xhr, status, error) {
		alert('Error: '+error);
	});	
	
}



function getDeviceServiceListForParticipant(that,id,defaultVal, defaultText) {
	var partId = that.options[that.selectedIndex].value;
	var url = contextpath+"devicelistservices/servicelist/ajax?participantId=" + partId;
	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
		for (i=0; i<id.length; i++) {
			$("#"+id[i]).empty();
			$("#"+id[i]).append($("<option value='"+defaultVal+"' >"+defaultText+"</option>"));
			$.each(data, function(key,val) {             
	  			$("#"+id[i]).append($("<option value='"+val.servListId+"' >"+val.servListDesc+' (ID: '+val.servListId+')'+"</option>"));
	        });
  		}
		
	}).fail(function (xhr, status, error) {
			alert('Error: '+error);		
	});
}

function deleteServices(data)
{
	var arr=[];
	for (var i=0;i<data.length;i++){
		arr.push(data[i][4]);
	}
   	document.getElementById("selectedServices").value = arr;  
    document.getElementById("deleteServicesForm").submit();
	
}

/*
function goToDeviceDetails(url){
	alert(url);
	$.getJSON({
	    url: url
	}).done(function (data, status, xhr) {	
	alert('success');
	}).fail(function (xhr, status, error) {
			alert('failed');		
	});
	
}
*/
function tog(v){
	return v ? "addClass" : "removeClass";
} 

$(document).on("input", ".clearable", function(){
	    $(this)[tog(this.value)]("x");
})
.on("mousemove", ".x", function( e ){
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]("onX");
}).on("touchstart click", ".onX", function( ev ){
    ev.preventDefault();
    $(this).removeClass("x onX").val("").change();
})

$(document).on("focus", ".clearable", function(){
	    $(this)[tog(this.value)]("x");
})
/////////////////////////////////////////////////////////EXCELLLLL


function excelDataTransaction(transaction){
	if(transaction==null || transaction=='' || transaction==undefined)
	{
		alert('No data to export');
	}
	else
	{
		const json=transaction.replace(/&quot;/ig,'"');
		var array=[];
		var tranArray=$.parseJSON(json);
			$.each(tranArray, function(){
				array.push({
					Transaction_History_ID : this.transactionId, 
					ATM : this.atm,
					UUID : this.uuid,
					CARD : this.card,
					ATM_ACCOUNT : this.atmAccount,
					AMOUNT : this.amount,
					currency : this.currency,
					transactionId : this.transactionId,
					apiCalltime: this.apiCalltime,
					apiReplytime: this.apiReplytime,
					coreStatus : this.coreStatus,
					coreDescription: this.coreDescription,
					completion: this.completion,
					dispenseAmount: this.dispenseAmount,
					accountingState : this.accountingState,
					reverseReason: this.reverseReason,
					sourceAccount: this.sourceAccount,
					dateTime: this.dateTime,
					transactionType: this.transactionType
				});
			});
			
			var sheet = XLSX.utils.json_to_sheet(array, {sheet:"Sheet JS"});
			
			var wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, sheet, "testestest");
			const date = new Date();
			XLSX.writeFile(wb,"transaction_"+date+".xlsx");
	}
	}
	
	function excelDataEJournal(EJournal){
	if(EJournal==null || EJournal=='' || EJournal==undefined)
	{
		alert('No data to export');
	}
	else
	{
		const json=EJournal.replace(/&quot;/ig,'"');
		var array=[];
		var EJournalArray=$.parseJSON(json);
			$.each(EJournalArray, function(){
				array.push({
					EJSeqId : this.EJSeqId, 
					EJPartId : this.EJPartId,
					EJReqNum : this.EJReqNum,
					EJDevId : this.EJDevId,
					EJInfoTimestamp : this.EJInfoTimestamp,
					EJInfoType : this.EJInfoType,
					EJInfoKey : this.EJInfoKey,
					EJInfoValue : this.EJInfoValue,
					EJTxnReqNum : this.EJTxnReqNum
				});
			});
			
			var sheet = XLSX.utils.json_to_sheet(array, {sheet:"Sheet JS"});
			
			var wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, sheet, "testestest");
			const date = new Date();
			XLSX.writeFile(wb,"EJournal_"+date+".xlsx");
	}
	



}





