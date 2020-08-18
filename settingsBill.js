module.exports = function SettingsBill() {

    var callTotalSettings = 0.00;
    var smsTotalSettings = 0.00;
    var totalSettings = 0.00;

    var callCostValue = 0.00;
    var smsCostValue = 0.00;
    
    var warningLevelValue = 0.00;
    var criticalLevelValue = 0.00;

    var actionsList = [];


    function updateValues(inputObject) {
        if (checkInput(inputObject)) {
            callCostValue = Number(inputObject.callCost);
            smsCostValue = Number(inputObject.smsCost);
            warningLevelValue = Number(inputObject.warningLevel);
            criticalLevelValue = Number(inputObject.criticalLevel);
            return true;
        }
        return false;
    }

    function checkInput(inpt) {
        for (const i in inpt) {
            var currentKeyValue = parseFloat(inpt[i])
            if (isNaN(currentKeyValue)) {
                return false;
            }
        }
        return true;
    }

    function recordAction(type, cost) {
        if (type != undefined && cost != undefined) {
            var action = {
                'type': type,
                'cost': cost,
                'timestamp': new Date()
            };
            actionsList.push(action)
            return true;
        }
        return false;
    }

    function addFunction(action) {
        if (!isCriticalLevelReached(action)) {
            switch (action) {
                case "call":
                    totalSettings += callCostValue;
                    callTotalSettings += callCostValue;
                    recordAction(action, callCostValue);
                    break;
                case "sms":
                    totalSettings += smsCostValue;
                    smsTotalSettings += smsCostValue;
                    recordAction(action, smsCostValue);
                    break;
                default:
                    return false
            };
            return true
        }
        return false

    }

    function isCriticalLevelReached(type) {
        switch (type) {
            case "call":
                return (totalSettings + callCostValue) > criticalLevelValue;                
            case "sms":
                return (totalSettings + smsCostValue) > criticalLevelValue;
            default:
                return false;
        }
    }

    function getColorString() {
        if (totalSettings === 0) {
            return "";
        }
        if (totalSettings >= warningLevelValue && totalSettings < criticalLevelValue) {
            return "warning";
        } else if (totalSettings >= criticalLevelValue) {
            return "danger";
        } else {
            return "";
        }
    }

    function settingsBillTotals() {
        return {
            grand: totalSettings.toFixed(2),
            call: callTotalSettings.toFixed(2),
            sms: smsTotalSettings.toFixed(2)
        };
    }

    function settingsBillCosts() {
        return {
            smsCost: smsCostValue.toFixed(2),
            callCost: callCostValue.toFixed(2),
            warningLevel: warningLevelValue.toFixed(2),
            criticalLevel: criticalLevelValue.toFixed(2)
        };
    }

    function getActions(type) {

        switch (type) {
            case "call":
                return getActionsForType(type)
            case "sms":
                return getActionsForType(type)
            default:
                return actionsList;
        }
    }

    function getActionsForType(type) {
        var temp = [];
        for (let i = 0; i < actionsList.length; i++) {
            if (actionsList[i]['type'] == type) {
                temp.push(actionsList[i])
            }
        }
        return temp;
    }

    return {
        updateValues,
        settingsBillTotals,
        addFunction,
        getColorString,
        recordAction,
        settingsBillCosts,
        getActions
    }
}