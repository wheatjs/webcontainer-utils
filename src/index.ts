import type { DirectoryNode, FileSystemTree } from '@webcontainer/api'
import { isFunction } from '@antfu/utils'

/**
 * Converts Vite's glob import modules to a file system tree.
 */
export async function convertRawGlobImportToFileSystemTree(input: Record<string, (() => Promise<string>) | string>) {
  const files = await Promise.all(Object.entries(input)
    .map(async ([path, file]) => ([path, isFunction(file) ? await file() : file])))

  const tree: FileSystemTree = {}

  for (const [path, contents] of files) {
    const parts = path.split('/')
    let current = tree

    for (const [index, part] of parts.entries()) {
      if (index === parts.length - 1) {
        current[part] = {
          file: {
            contents,
          },
        }
      }
      else {
        current[part] = current[part] || {
          directory: {},
        }

        current = (current[part] as DirectoryNode).directory
      }
    }
  }

  return tree
}
