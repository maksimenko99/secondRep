import { expect, Locator, Page } from "@playwright/test"

export class Wildberries {
    page: Page

    constructor(page: Page){
        this.page = page
    }

    async goTo(){
        await this.page.goto('https://www.wildberries.ru/')
        await this.page.getByAltText('Wildberries').waitFor({state: 'visible'})  
    }

    async fillSearch(){
        await this.page.locator('#searchBlock').getByPlaceholder('Найти на Wildberries').fill('Транспортир')
        await this.page.keyboard.press('Enter')
    }

    async sort(){
        await this.page.getByRole('button', {name: 'По популярности'}).click()
        await this.page.getByRole('listitem').filter({ hasText: 'По возрастанию цены' }).click()
        await this.page.waitForTimeout(1000)
    }


    async searchElements(){
        const elements = await this.page.getByRole('article').all()
        for(let i = 0; i <= 10; i++){
            const price = await elements[i].locator('ins').textContent()
            const name = await elements[i].getByRole('heading', {level: 2}).textContent()
            console.log(`${price} ${name}`)
        }
    }
}