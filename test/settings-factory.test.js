let assert = require("assert");
var factory = require("../settingsBill");

describe("The updateValues function", function () {
    it("should update the values of the SettingsFactory Instance", function () {

        var input = {
            callCost: "1.25",
            smsCost: "0.25",
            warningLevel: "7.25",
            criticalLevel: "10.25"
        }
        assert.equal(true, factory().updateValues(input))
    });
    it("should update the values of the SettingsFactory Instance", function () {
        var input = {
            callCost: "Muj",
            smsCost: "0.25",
            warningLevel: "7.25",
            criticalLevel: "10.25"
        }
        assert.equal(false, factory().updateValues(input))
    });
    it("should update the values of the SettingsFactory Instance", function () {
        var input = {
            callCost: 0.15,
            smsCost: "0.25",
            warningLevel: "7.25",
            criticalLevel: "10.25"
        }
        assert.equal(true, factory().updateValues(input))
    });
});

describe("The addFunction method", function () {
    it("should return true if call was added", function () {
        var factoryOne = factory();
        var input = {
            callCost: "1.25",
            smsCost: "0.25",
            warningLevel: "7.25",
            criticalLevel: "10.25"
        }
        factoryOne.updateValues(input)
        assert.equal(true, factoryOne.addFunction("call"))
    });
    it("should return true if sms was added", function () {
        var factoryOne = factory();
        var input = {
            callCost: "1.25",
            smsCost: "0.25",
            warningLevel: "7.25",
            criticalLevel: "10.25"
        }
        factoryOne.updateValues(input)
        assert.equal(true, factoryOne.addFunction("sms"))
    });
    it("should return false if action is not call or sms", function () {
        var factoryOne = factory();
        var input = {
            callCost: "1.25",
            smsCost: "0.25",
            warningLevel: "7.25",
            criticalLevel: "10.25"
        }
        factoryOne.updateValues(input)
        assert.equal(false, factoryOne.addFunction("data"))
    });
});

describe("The settingsBillTotals function", function () {

    it("should return the correct totals for an instance", function () {

        var data = {
            callCost: 2.55,
            smsCost: 0.65,
            warningLevel: 30.00,
            criticalLevel: 50.00
        }

        var f = factory();


        f.updateValues(data)

        f.addFunction("call")

        var expected = {
            call: 2.55,
            grand: 2.55,
            sms: 0.00
        }

        var actual = f.settingsBillTotals()

        assert.deepEqual(expected, actual)
    });




    it("should return the correct totals for an instance", function () {

        var f = factory();

        var data = {
            callCost: "2.55",
            smsCost: "0.65",
            warningLevel: "30.00",
            criticalLevel: "50.00"
        }
        f.updateValues(data)
        f.addFunction("call")
        f.addFunction("sms")
        f.addFunction("call")
        f.addFunction("sms")
        var totals = f.settingsBillTotals()
        assert.deepEqual({
            grand: 6.40,
            call: 5.10,
            sms: 1.30
        }, totals)
    });

    var f = factory();

    var data = {
        callCost: "2.00",
        smsCost: "0.65",
        warningLevel: "30.00",
        criticalLevel: "50.00"
    }
    f.updateValues(data)
    f.addFunction("call")
    f.addFunction("call")
    f.addFunction("call")
    f.addFunction("call")
    f.addFunction("call")
    var totals = f.settingsBillTotals()
    assert.deepEqual({
        grand: 10.00,
        call: 10.00,
        sms: 0.00
    }, totals)
});


describe("The getColorString (settings widget)", function () {
    it("should return appropriate color string", function () {

        var Instance = factory();

        var input = {
            callCost: "1.25",
            smsCost: "0.25",
            warningLevel: "7.25",
            criticalLevel: "10.25"
        }
        Instance.updateValues(input)
        Instance.addFunction("call")
        Instance.addFunction("call")
        Instance.addFunction("call")
        assert.equal("", Instance.getColorString())
    });
    it("should return appropriate color string", function () {
        var fact = factory();

        var input = {
            callCost: "1.00",
            smsCost: "0.25",
            warningLevel: "7.00",
            criticalLevel: "10.00"
        }
        fact.updateValues(input)
        
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")
        fact.addFunction("call")

        assert.equal("danger", fact.getColorString())

        var totals = fact.settingsBillTotals()
        assert.deepEqual({
            grand: 10.00,
            call: 10.00,
            sms: 0.00
        }, totals)
    });
    it("should return appropriate color string", function () {

        var input = {
            callCost: "1.25",
            smsCost: "0.25",
            warningLevel: "7.25",
            criticalLevel: "10.25"
        }

        var factoryFunction = factory();

        factoryFunction.updateValues(input)
        factoryFunction.addFunction("call")
        factoryFunction.addFunction("call")
        factoryFunction.addFunction("call")
        factoryFunction.addFunction("call")
        factoryFunction.addFunction("call")
        factoryFunction.addFunction("call")
        factoryFunction.addFunction("call")

        assert.equal("warning", factoryFunction.getColorString())
    });
});



describe("The recordAction", function () {
    it("should return false if an action was not recorded", function () {

        var Instance = factory();

        var expected = false;
        var actual = Instance.recordAction();

        assert.equal(expected, actual)
    });
    it("should return true if an action was recorded", function () {

        var Instance = factory();

        var expected = true;
        var actual = Instance.recordAction("call", 5.00);

        assert.equal(expected, actual)
    });
    it("should return true if an action was recorded", function () {

        var Instance = factory();

        var expected = true;
        var actual = Instance.recordAction("sms", 3.00);

        assert.equal(expected, actual)
    });
});