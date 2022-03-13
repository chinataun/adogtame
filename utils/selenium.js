const {Builder, By, Key} = require('selenium-webdriver')

async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://adogtame-gps.herokuapp.com")

    await driver.findElement(By.name("nombre")).sendKeys('Adrian', Key.TAB)
    await driver.findElement(By.id("nombreM")).click()
console.log(driver.findElement(By.id("nombreM")))
     await driver.findElement(By.name("rango")).sendKeys("54", Key.TAB)
    await driver.sleep(3000)

    await driver.findElement(By.id("crearSubmit")).click()
}
example();