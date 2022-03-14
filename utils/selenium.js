const {Builder, By, Key, Actions} = require('selenium-webdriver')

async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://adogtame-gps.herokuapp.com")

    await driver.findElement(By.name("nombre")).sendKeys('Adrian', Key.TAB)
    await driver.findElement(By.css("input[id='nombreM']")).click()
    await driver.sleep(3000)

    await driver.findElement(By.id("crearSubmit")).click()
}
example();