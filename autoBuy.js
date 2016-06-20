function intervalSet(on) {
    if (on) {
        var oneMs = setInterval(function () {
            buyBuilding();
        }, 1);

        var oneS = setInterval(function () {
            buyUpgrades();
            reloadForBadCookie();
            specialUpgrade();
            seasons();
        }, 1000);
    }
    else {
        clearInterval(oneMs);
        clearInterval(oneS);
    }
}

var oneMs = setInterval(function () {
    buyBuilding();
}, 1);

var oneS = setInterval(function () {
    buyUpgrades();
    reloadForBadCookie();
    specialUpgrade();
    seasons();
}, 1000);

var prestigeMe = setInterval(function () {
    prestigeWorldWide();
}, 20000);

intervalSet(true);

function seasons() {
    var valentine = Game.Has('Pure heart biscuits') && Game.Has('Ardent heart biscuits') && Game.Has('Sour heart biscuits') && Game.Has('Weeping heart biscuits') && Game.Has('Golden heart biscuits') && Game.Has('Eternal heart biscuits');
    var halloween = Game.Has('Skull cookies') && Game.Has('Ghost cookies') && Game.Has('Bat cookies') && Game.Has('Slime cookies') && Game.Has('Pumpkin cookies') && Game.Has('Eyeball cookies') && Game.Has('Spider cookies');
    var christmas = Game.Has('Christmas tree biscuits') && Game.Has('Snowflake biscuits') && Game.Has('Snowman biscuits') && Game.Has('Holly biscuits') && Game.Has('Candy cane biscuits') && Game.Has('Bell biscuits') && Game.Has('Present biscuits');
    var easter = Game.Has('Chicken egg') && Game.Has('Duck egg') && Game.Has('Turkey egg') && Game.Has('Quail egg') && Game.Has('Robin egg') && Game.Has('Ostrich egg') && Game.Has('Cassowary egg') && Game.Has('Salmon roe') && Game.Has('Frogspawn') && Game.Has('Shark egg') && Game.Has('Turtle egg') && Game.Has('Ant larva') && Game.Has('Golden goose egg') && Game.Has('Faberge egg') && Game.Has('Wrinklerspawn') && Game.Has('Cookie egg') && Game.Has('Omelette') && Game.Has('Century egg') && Game.Has('"egg"') && Game.UpgradesById[227] != null;
    var goldenCookieReload = Game.Has('Lucky day') && Game.Has('Serendipity') && Game.Has('Get lucky');
    var wrinklers = 0;
    var valentineButton = document.querySelector("[onclick='Game.UpgradesById[184].buy();']");
    var halloweenButton = document.querySelector("[onclick='Game.UpgradesById[183].buy();']");
    var christmasButton = document.querySelector("[onclick='Game.UpgradesById[182].buy();']");
    var easterButton = document.querySelector("[onclick='Game.UpgradesById[209].buy();']");
    for (i = 0; i < 12; i++) {
        if (Game.wrinklers[i].close == 1) {
            wrinklers++;
        }
    }
    if (Game.Has('A festive hat') == false) {
        christmasButton.click();
    }
    else if (valentine == false) {
        valentineButton.click();
    }
    else if (Game.goldenCookie.maxTime > 6413) {
        if (goldenCookieReload == true && Game.clickFrenzy == 0 && Game.frenzy == 0) {
            reload();
        }
        christmasButton.click();
    }
    else if (halloween == false && wrinklers == 12) {
        halloweenButton.click();
        for (i = 0; i < 12; i++) {
            Game.wrinklers[i].hp = 0;
        }
    }
    else if (easter == false) {
        easterButton.click();
    }
    else {
        christmasButton.click();
    }
}

var upgradeDragon = setInterval(function () {
    if (Game.Has('A crumbly egg')) {
        Game.UpgradeDragon();
        var skipDragon = false;
    }
}, 1);

var upgradeSanta = setInterval(function () {
    if (Game.Has('A festive hat')) {
        Game.UpgradeSanta();
        var skipSanta = false;
    }
}, 1);

function specialUpgrade() {
    if (Game.dragonLevel >= 21 && skipDragon != true) {
        Game.dragonAura = 10;
        Game.dragonAura2 = 15;
        clearInterval(upgradeDragon);
        var skipDragon = true;
    }
    if (Game.santaLevel >= 14 && skipSanta != true) {
        clearInterval(upgradeSanta);
        var skipSanta = true;
    }
    else {
        
    }
}

function reload() {
    var buttonOptions = document.getElementById("prefsButton");
    var optionsMenu = document.getElementsByClassName("option");
    var lenMenu = optionsMenu.length;
    buttonOptions.click();
    Game.WriteSave();
    Game.ExportSave();
    var saveData = document.getElementById("textareaPrompt").innerHTML;
    Game.ClosePrompt();
    Game.ImportSave();
    document.getElementById("textareaPrompt").innerHTML = saveData;
    document.getElementById("promptOption0").click();
    document.getElementById("statsButton").click();
}

function reloadForBadCookie() {
    if (Game.frenzyPower == 0.5) {
        reload();
        document.getElementById("statsButton").click();
    }
}

function buyBuilding() {
    if (document.querySelector("[class='storeSection']") == null) {
        document.getElementById("storeBulkBuy").click();
    }
    var buy1 = document.getElementById("storeBulk1");
    if (buy1.getAttribute("class") != "storeBulkAmount selected") {
        buy1.click();
    }
    var store = document.querySelector("[class='storeSection']");
    var unlocked = store.getElementsByClassName("product unlocked enabled");
    var len = unlocked.length;
    for (var i = 0; i < len; i++) {
        var buy = unlocked[i].querySelector("[style='color: rgb(0, 255, 0);']");
        if (buy != null) {
            buy.click();
        }
    }
}

function sellBuildings() {
    Game.dragonAura = 5;
    document.getElementById("storeBulkSell").click();
    document.getElementById("storeBulkMax").click();
    var store = document.querySelector("[class='storeSection selling']");
    var unlocked = store.getElementsByClassName("product unlocked enabled");
    var len = unlocked.length;
    for (var i = 0; i < len - 1; i++) {
        unlocked[i].click();
    }
    if (document.querySelector("[onclick='Game.UpgradesById[227].buy();']") != null) {
        document.querySelector("[onclick='Game.UpgradesById[227].buy();']").click();
    }
}

function prestigeWorldWide() {
    if (document.getElementsByClassName("close menuClose").length < 1) {
        document.getElementById("statsButton").click();
    }
    var prestigeStatus = document.getElementsByTagName('small');
    var prestigeLen = prestigeStatus.length;
    for (i = 0; i < prestigeLen; i++) {
        if (prestigeStatus[i].innerHTML == " (25.00% of income)") {
            intervalSet(false);
            sellBuildings();
            document.getElementById("legacyButton").click();
            document.getElementById("promptOption0").click();
            for (i = 0; i < 10; i++) {
                if (document.getElementById("ascendButton") != null) {
                    document.getElementById("ascendButton").click();
                    document.getElementById("promptOption0").click();
                    intervalSet(true);
                    break;
                }
            }
        }
    }
}

var noPurchase = [71, 72, 73, 74, 79, 83, 84, 85, 87, 91, 124, 141, 142, 167, 181, 182, 183, 184, 185, 186, 189, 208, 209, 225, 227, 253, 254, 255, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 320, 321, 322, 323, 325, 326, 327, 328, 329, 331, 332, 333, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 368, 393, 394];
var yesPurchase = ["empty"];
var upgradeLen = Game.UpgradesById.length;
var skipLen = noPurchase.length;
for (var i = 0; i < upgradeLen; i++) {
    for (var j = 0; j < skipLen; j++) {
        if (i == noPurchase[j].toString()) {
            break;
        }
        else {
            if (j === skipLen - 1) {
                yesPurchase.push(i);
            }
        }
    }
}

function buyUpgrades() {
    if (yesPurchase.length > 1) {
        for (var i = 0; i < yesPurchase.length; i++) {
            var upgradeCheck = yesPurchase[i].toString();
            var element = "[onclick='Game.UpgradesById[" + upgradeCheck + "].buy();']";
            var upgradeClick = document.querySelector(element);
            if (upgradeCheck === "69") {
                if (upgradeClick != null) {
                    if (upgradeClick.getAttribute("class") == "crate upgrade enabled") {
                        upgradeClick.click();
                        document.getElementById("promptOption0").click();
                    }
                }
            }
            else {
                if (upgradeClick != null) {
                    if (upgradeClick.getAttribute("class") == "crate upgrade enabled") {
                        upgradeClick.click();
                    }
                }
            }
        }
    }
}






//cookieMonster

function cookieMonster()
{
    Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');
}

//cookieBot

function seasonPopup()
{
    if (Game.seasonPopup.life > 0) {
        Game.seasonPopup.click();
    }
}

function goldenCookie()
{
    if (Game.goldenCookie.life > 0) {
        Game.goldenCookie.click();
    }
}

var autoClicker = function (clicksAtOnce, repeatInterval)
{
    var cheated = false;
    var intoTheAbyss = function ()
    {
        if (!cheated)
        {
            cheated = true;
            for (var i = 0; i < clicksAtOnce; i++)
            {
                Game.ClickCookie();
                Game.lastClick = 0;
            }
            cheated = false;
        };
    };
    return setInterval(intoTheAbyss, repeatInterval);
};
autoClicker(100, 1);



//stuff

function reload()
{
    var buttonOptions = document.getElementById("prefsButton");
    var optionsMenu = document.getElementsByClassName("option");
    var lenMenu = optionsMenu.length;
    buttonOptions.click();
    Game.WriteSave();
    Game.ExportSave();
    var saveData = document.getElementById("textareaPrompt").innerHTML;
    Game.ClosePrompt();
    Game.ImportSave();
    document.getElementById("textareaPrompt").innerHTML = saveData;
    document.getElementById("promptOption0").click();
}

function reloadForBadCookie()
{
    if (Game.frenzyPower == 0.5)
    {
        reload();
    }
}

reloadForBadCookie();

//break

javascript:
function reloadWrinlkle()
{
    var buttonOptions = document.getElementById("prefsButton");
    var optionsMenu = document.getElementsByClassName("option");
    var lenMenu = optionsMenu.length;
    buttonOptions.click();
    Game.ImportSave();
    document.getElementById("textareaPrompt").innerHTML = "Mnx8MTQ2NTk1NDg5ODk3MjsxNDU1NzY3NzYyNTcxOzE0NjYwMjcwMjM3MzE7U3B1bmdyYWR8w6TCssKoBHw1LjQ4NTIyMzczODc1MDE4MmUrMzQ7MS44OTAwMjQxMDcxNDQ1MTZlKzM3OzE0NjA0NDE2MDA7NTUwNDY7MS44ODk4MTE1MjA0MzYxMDAyZSszNzs4NDg0OzA7Mzs3LjI3NTkxMTEyMDgzNzk0ZSszNjsxOzA7MDswOy0xOzIxOzczMTs0LjM2ODIzMjE3MzI5OTYyNmUrMzI7MTsxNDsyOzI0Nzc2MTg7NTtoYWxsb3dlZW47NS4xOTgxMjc0ODgwMjE0MWUrMzM7MTI7MTkzNzc0MTI5OzE3NjU2NDM4NzsxNzIwODU1NjswOzA7MTg5OzMyMTszMjI7MzIwOzIyNTsyMTsxNTsxMDswOzA7fDU0Niw4OTYsMS4yNTY2MzcwMjk3Nzk1NjNlKzI3LDA7NTU1LDkwNSw4LjIxMTcxNTQ1MzgyMjU0NWUrMjQsMDs1MjUsODc1LDEuMTI4ODIzMjg2ODE5MDczMWUrMjYsMDs0ODksODM5LDMuNjM2MjY4NTgzMzk0OTE1ZSsyNiwwOzQ5Miw4NDIsMS4yOTU5MjMzMjYxMzAzNTQ1ZSsyNywwOzQ3MSw4MjEsMy4zMzY1MDU2OTg3NTc1NDk2ZSsyNiwwOzQ2Miw4MTIsMS40NDMyMTAxOTQxNjY0NDExZSsyNywwOzQ0MSw3OTEsNS44ODQ0NTk0Njk0NzU3MDI0ZSsyNiwwOzQxNSw3NjUsMi4zMzQyNTE4ODg4NzUxNDQzZSsyNiwwOzM5Miw3NDIsMS4xNDE3MzQ2NjIwMDUyNjUxZSsyNywwOzM4NSw3MzUsNi44NzQ4NjA5MjAwMTgzMzZlKzI3LDA7MzcxLDcyMSw0LjA2NTk4MzIwNjc3NzIyMmUrMjgsMDszNDUsNjk1LDEuODYwMTAxMjEwNjUzNTU3ZSsyOCwwOzM0MSw2OTMsMS4wNzk0OTk0ODk1Nzk5NzE5ZSsyOSwwO3zDp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8Kgwo/Dp8KzwrzDpMKMwr/DpMK/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wrPDp8K/wr/Dp8KAwoDDpMKwwoPDpMKzwr/Dp8K/wr/Dp8K/wrzDp8K/wr/Dp8K/wr/DpsK6wo/Dp8K/wr/Dp8K/wr/Dp8K/wrLDp8K/wr/Dp8K/wr/Dp8K+wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K4wq/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wq/Dp8K/wr/Dp8K/wr/Dp8K/wr/Dp8K/wr9/fMOnwr/Cv8Onwr/Cv8Onwr/Cv8Onwr/Cv8Onwr/Cv8Olwr/Cv8Onwr/CvMOkwr/Cv8Onwr/Cv8Onwr/Cv8Onwr/Cv8OnwrvCv8Onwr/Cv8Onwr/Cv8Onwr/Cs8Onwr/Cv8Onwr/Cv8Onwr/Cv8Ogwr/Cvg%3D%3D%21END%21";
    document.getElementById("promptOption0").click();
    document.getElementById("statsButton").click();    
}