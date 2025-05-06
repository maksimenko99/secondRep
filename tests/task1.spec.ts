import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Algoritms level1', () => {
const folder = ['A', 'B']

function getFolders(folders: string[]): string[] {
    let filePaths: any[] = []
    for(const folder of folders){
        const folderFiles: any[] = fs.readdirSync(`tests/fileSystem/${folder}`, { recursive: true })
        filePaths.push(...folderFiles)
    }
    return filePaths
    }
    const filePaths = getFolders(folder)
    const filteredPath = filePaths.filter(folder => folder.endsWith('.ts'))
    console.log(filteredPath)
})

test('Algoritms level2', () => {
    function getFolderTSFileCounts(baseFolders: string[], rootDir = 'tests/fileSystem'): string[] {
        const results: any[] = []
        function walk(currentPath: string, relativePath: string) {
            const entries = fs.readdirSync(currentPath, { withFileTypes: true })
        
            let tsCount = 0
        
            for (const entry of entries) {
                const entryFullPath = path.join(currentPath, entry.name)
                const entryRelativePath = path.join(relativePath, entry.name)
                if (entry.isFile() && entry.name.endsWith('.ts')) {
                    tsCount++
                } else if (entry.isDirectory()) {
                    walk(entryFullPath, entryRelativePath)
                }
            }
                if (tsCount > 0) {
                    results.push(`${relativePath} (${tsCount})`)
                }
        }
        for (const baseFolder of baseFolders) {
            const fullBasePath = path.join(rootDir, baseFolder)
            walk(fullBasePath, baseFolder)
        }
        return results
    }
    const topLevelFolders = ['A', 'B']
    const tsFileCounts = getFolderTSFileCounts(topLevelFolders)
    console.log(tsFileCounts)
})