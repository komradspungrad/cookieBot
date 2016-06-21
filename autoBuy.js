//Create emptpy interval vars
var intervalBuildings = null;
var intervalUpgrades = null;
var intervalClot = null;
var intervalSeasons = null;
var intervalSpecial = null;
var intervalPrestige = null;
var intervalReindeer = null;
var intervalGoldenCookie = null;

//Common interface statics
var tech = document.getElementById("techUpgrades");
var upgrades = document.getElementById("upgrades");
var store = document.querySelector("[class='storeSection']");
var storeSell = document.querySelector("[class='storeSection selling']");
var options = document.getElementById("prefsButton");
var stats = document.getElementById("statsButton");
var legacy = document.getElementById("legacyButton");


//Interval manager
function intervalSet(on) {
    if (on) {
        intervalBuildings = setInterval(function () {
            buyBuilding();
        }, 1);
        intervalUpgrades = setInterval(function () {
            buyUpgrades();
        }, 100);
        intervalClot = setInterval(function () {
            reloadForBadCookie();
        }, 1000);
        intervalSeasons = setInterval(function () {
            seasons();
        }, 1000);
        intervalSpecial = setInterval(function () {
            specialUpgrade();
        }, 1000);
        intervalPrestige = setInterval(function () {
            prestigeWorldWide();
        }, 20000);
        intervalReindeer = setInteval(function () {
            seasonPopup();
        }, 1000)
        intervalGoldenCookie = setInterval(function () {
            goldenCookie();
        }, 1000)
    }
    else {
        clearInterval(intervalBuildings);
        clearInterval(intervalUpgrades);
        clearInterval(intervalClot);
        clearInterval(intervalSeasons);
        clearInterval(intervalSpecial);
        clearInterval(intervalReindeer);
        clearInterval(intervalGoldenCookie);
    }
}

//Start the setintervals
intervalSet(true);

//Loop for picking seasons
function seasons() {
    var valentine = Game.Has('Pure heart biscuits') && Game.Has('Ardent heart biscuits') && Game.Has('Sour heart biscuits') && Game.Has('Weeping heart biscuits') && Game.Has('Golden heart biscuits') && Game.Has('Eternal heart biscuits');
    var halloween = Game.Has('Skull cookies') && Game.Has('Ghost cookies') && Game.Has('Bat cookies') && Game.Has('Slime cookies') && Game.Has('Pumpkin cookies') && Game.Has('Eyeball cookies') && Game.Has('Spider cookies');
    var christmas = Game.Has('Christmas tree biscuits') && Game.Has('Snowflake biscuits') && Game.Has('Snowman biscuits') && Game.Has('Holly biscuits') && Game.Has('Candy cane biscuits') && Game.Has('Bell biscuits') && Game.Has('Present biscuits');
    var easter = Game.Has('Chicken egg') && Game.Has('Duck egg') && Game.Has('Turkey egg') && Game.Has('Quail egg') && Game.Has('Robin egg') && Game.Has('Ostrich egg') && Game.Has('Cassowary egg') && Game.Has('Salmon roe') && Game.Has('Frogspawn') && Game.Has('Shark egg') && Game.Has('Turtle egg') && Game.Has('Ant larva') && Game.Has('Golden goose egg') && Game.Has('Faberge egg') && Game.Has('Wrinklerspawn') && Game.Has('Cookie egg') && Game.Has('Omelette') && Game.Has('Century egg') && Game.Has('"egg"') && Game.UpgradesById[227] != null;
    var goldenCookieReload = Game.Has('Lucky day') && Game.Has('Serendipity') && Game.Has('Get lucky');
    var wrinklers = 0;
    var toggle = document.getElementById("toggleUpgrades");
    var valentineButton = toggle.querySelector("[onclick='Game.UpgradesById[184].buy();']");
    var halloweenButton = toggle.querySelector("[onclick='Game.UpgradesById[183].buy();']");
    var christmasButton = toggle.querySelector("[onclick='Game.UpgradesById[182].buy();']");
    var easterButton = toggle.querySelector("[onclick='Game.UpgradesById[209].buy();']");
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

//Loop for big cookie clicks
function autoClicker(clicksAtOnce, repeatInterval) {
    var cheated = false;
    var intoTheAbyss = function () {
        if (!cheated) {
            cheated = true;
            for (var i = 0; i < clicksAtOnce; i++) {
                Game.ClickCookie();
                Game.lastClick = 0;
            }
            cheated = false;
        };
    };
    return setInterval(intoTheAbyss, repeatInterval);
};

//Click the big cookie
autoClicker(100, 1);

//Click the reindeers
function seasonPopup() {
    if (Game.seasonPopup.life > 0) {
        Game.seasonPopup.click();
    }
}

//Click the golden cookies
function goldenCookie() {
    if (Game.goldenCookie.life > 0) {
        Game.goldenCookie.click();
    }
}

//Get dragon upgrades
var upgradeDragon = setInterval(function () {
    if (Game.Has('A crumbly egg')) {
        Game.UpgradeDragon();
        var skipDragon = false;
    }
}, 1);

//Get santa upgrades
var upgradeSanta = setInterval(function () {
    if (Game.Has('A festive hat')) {
        Game.UpgradeSanta();
        var skipSanta = false;
    }
}, 1);

//Finish out special upgrades
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

//Export/import and reload
function reload() {
    var optionsMenu = document.getElementsByClassName("option");
    var lenMenu = optionsMenu.length;
    options.click();
    Game.WriteSave();
    Game.ExportSave();
    var saveData = document.getElementById("textareaPrompt").innerHTML;
    Game.ClosePrompt();
    Game.ImportSave();
    document.getElementById("textareaPrompt").innerHTML = saveData;
    document.getElementById("promptOption0").click();
    document.getElementById("statsButton").click();
}

//Reload for clot
function reloadForBadCookie() {
    if (Game.frenzyPower == 0.5) {
        reload();
        document.getElementById("statsButton").click();
    }
}

//Buy best building
function buyBuilding() {
    if (document.querySelector("[class='storeSection']") == null) {
        document.getElementById("storeBulkBuy").click();
    }
    var buy1 = document.getElementById("storeBulk1");
    if (buy1.getAttribute("class") != "storeBulkAmount selected") {
        buy1.click();
    }
    var unlocked = store.getElementsByClassName("product unlocked enabled");
    var len = unlocked.length;
    for (var i = 0; i < len; i++) {
        var buy = unlocked[i].querySelector("[style='color: rgb(0, 255, 0);']");
        if (buy != null) {
            buy.click();
        }
    }
}

//Sell for prestige
function sellBuildings() {
    Game.dragonAura = 5;
    document.getElementById("storeBulkSell").click();
    document.getElementById("storeBulkMax").click();
    var unlocked = storeSell.getElementsByClassName("product unlocked enabled");
    var len = unlocked.length;
    for (var i = 0; i < len - 1; i++) {
        unlocked[i].click();
    }
    if (document.querySelector("[onclick='Game.UpgradesById[227].buy();']") != null) {
        document.querySelector("[onclick='Game.UpgradesById[227].buy();']").click();
    }
}

//Prestige at given %
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

//Ids for upgrade skips
var noPurchase = [71, 72, 73]
var skipLen = noPurchase.length;

//Buy upgrades when they're available
function buyUpgrades() {
    var upgradesList = upgrades.getElementsByClassName("crate upgrade enabled");
    var techList = tech.getElementsByClassName("crate upgrade enabled");
    var upgradesLen = upgradesList.length;
    var techLen = techList.length;
    if (upgradesLen > 0) {
        if ((upgradesLen === 1 && upgradesList[0].getAttribute("onclick") == "Game.UpgradesById[227].buy();") == false) {
            for (i = 0; i < upgradesLen; i++) {
                upgradesList[i].click();
            }
        }
    }
    if (techLen > 0) {
        for (i = 0; i < skipLen; i++) {
            if ((techList[0].getAttribute("onclick") == "Game.UpgradesById[" + noPurchase[i] + "].buy();") == false) {
                techList[0].click();
            }
        }
    }
}





/*





*/