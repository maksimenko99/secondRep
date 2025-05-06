import { test, expect } from '@playwright/test'
import { Wildberries } from '../pages/Wildberries';

test('Wildberries', async ({ page }) => {
    let wildberries: Wildberries = new Wildberries(page)
    await wildberries.goTo()
    await wildberries.fillSearch()
    await wildberries.sort()
    await wildberries.searchElements()
})