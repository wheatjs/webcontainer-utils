import { describe, expect, it } from 'vitest'
import { convertRawGlobImportToFileSystemTree } from '../src/index'

describe('should', () => {
  it('converted test dir to FileSystemTree', async () => {
    const modules = import.meta.glob('./sample/**/**.*', { as: 'raw' })
    const tree = await convertRawGlobImportToFileSystemTree(modules)

    expect(tree).toMatchObject({
      '.': {
        directory: {
          sample: {
            directory: {
              'src': {
                directory: {
                  'readme.md': {
                    file: {
                      contents: 'Hello World 2\n',
                    },
                  },
                },
              },
              'readme.md': {
                file: {
                  contents: 'Hello World\n',
                },
              },
            },
          },
        },
      },
    })
  })

  it('converted test dir to FileSystemTree using eager', async () => {
    const modules = import.meta.glob('./sample/**/**.*', { as: 'raw', eager: true })
    const tree = await convertRawGlobImportToFileSystemTree(modules)

    expect(tree).toMatchObject({
      '.': {
        directory: {
          sample: {
            directory: {
              'src': {
                directory: {
                  'readme.md': {
                    file: {
                      contents: 'Hello World 2\n',
                    },
                  },
                },
              },
              'readme.md': {
                file: {
                  contents: 'Hello World\n',
                },
              },
            },
          },
        },
      },
    })
  })
})
