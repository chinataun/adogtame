const {Builder, By, Key} = require('selenium-webdriver')

async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://adogtame-gps.herokuapp.com")

    await driver.findElement(By.name("nombre")).sendKeys('Adrian', Key.TAB)
    await driver.findElement(By.name("Masculino")).sendKeys('True', Key.TAB)
    await driver.findElement(By.name("Rango")).sendKeys('65', Key.RETURN)
    await driver.sleep(1000)

    await driver.findElement(By.name("Crear")).sendKeys("Submit", key.RETURN)
}
example();