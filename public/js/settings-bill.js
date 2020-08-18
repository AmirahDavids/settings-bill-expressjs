var callGrandTotal = document.querySelector(".callTotalSettings");
var smsGrandTotal = document.querySelector(".smsTotalSettings");
var grandTotal = document.querySelector(".totalSettings");


var callCostSettingElement = document.querySelector(".callCostSetting");
var smsCostSettingElement = document.querySelector(".smsCostSetting");
var warningLevelSetting = document.querySelector(".warningLevelSetting");
var criticalLevelSetting = document.querySelector(".criticalLevelSetting");
var updateSettingsButton = document.querySelector(".updateSettings");
var settingsAddButton = document.querySelector(".add")


var settingsFactory = SettingsFactory()


function updateEvent() {
    var userInput = {
        callSetting: callCostSettingElement.value,
        smsSetting: smsCostSettingElement.value,
        warningSetting: warningLevelSetting.value,
        criticalSetting: criticalLevelSetting.value
    };
    settingsFactory.updateValues(userInput);
    var colorString = settingsFactory.getColorString();
    grandTotal.classList.remove("warning");
    grandTotal.classList.remove("danger");
    if (colorString != "") {
        grandTotal.classList.add(colorString);
    }
}

function calculateSettingsTotal() {
    var checkedSettingsBtn = document.querySelector("input[name='billItemTypeWithSettings']:checked");
    if (checkedSettingsBtn) {
        var billItemType = checkedSettingsBtn.value
        settingsFactory.addFunction(billItemType);
        var colorString = settingsFactory.getColorString();
        callGrandTotal.innerHTML = settingsFactory.settingsBillTotals().callTotalSettings.toFixed(2);
        smsGrandTotal.innerHTML = settingsFactory.settingsBillTotals().smsTotalSettings.toFixed(2);
        grandTotal.innerHTML = settingsFactory.settingsBillTotals().totalSettings.toFixed(2);
        grandTotal.classList.remove("warning");
        grandTotal.classList.remove("danger");
        if (colorString != "") {
            grandTotal.classList.add(colorString);
        }
    }
}


updateSettingsButton.addEventListener("click", updateEvent);
settingsAddButton.addEventListener("click", calculateSettingsTotal);