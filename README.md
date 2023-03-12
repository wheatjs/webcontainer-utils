# webcontainer-utils

[![NPM version](https://img.shields.io/npm/v/webcontainer-utils?color=a1b858&label=)](https://www.npmjs.com/package/webcontainer-utils)

`webcontainer-utils` is a small utility package for [WebContainers](https://webcontainers.io/). Currently there are only a small number of utils. More will be added in the future. If you have any suggestions feel free to open an issue or a PR!

## 📦 Install

```bash
npm i webcontainer-utils
```

## `convertRawGlobImportToFileSystemTree()`

Converts a [Vite raw glob import](https://vitejs.dev/guide/features.html#glob-import-as) into Webcontainers [FileSystemTree](https://webcontainers.io/api#filesystemtree) structure.

### Usage

```ts
import { WebContainer } from '@webcontainer/api'
import { convertRawGlobImportToFileSystemTree } from 'webcontainer-utils'

const files = import.meta.glob('./playground/**/*.*', { as: 'raw' })
const filesystem = await convertRawGlobImportToFileSystemTree(files)
const container = await WebContainer.boot()

container.mount(filesystem)
```


## License

[MIT](./LICENSE) License © 2023 [Jacob Clevenger](https://github.com/wheatjs)
