# Krayfaus' Typescript Essentials

This package is a collection of utilities I find useful when coding in TypeScript.

| Function                | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| String.prototype.format | Equivalent* alternative to String literals.                 |
| String.format           | Equivalent* alternative to String literals.                 |
| String.value            | Avoid (string \| undefined) types.                          |
| resolve                 | Resolves a promise (try...catch) and returns [data, error]. |
| wait                    | Sleep worker thread for ``n`` milliseconds.                 |

> \* Slightly faster according to a [performance test](test/string.spec.ts).

## 👨‍🏫 Usage

### ``wait()`` and ``String.format``

```typescript
import '@krayfaus/essentials/extend/string';
import { wait } from '@krayfaus/essentials';

async function withEssentials() {
    const delay = await wait(5000); // Sleep for 5 seconds.
    console.info('Waited for {0}ms.'.format(delay));
}

async function withoutEssentials() {
    const delay = setTimeout(function () {
        /* do something after the timeout */
    }, 5000); // Sleep for 5 seconds.
    console.info(`Waited for ${delay}ms.`);
}
```

### ``resolve()`` and ``String.value()``

```typescript
import axios from 'axios';
import { resolve } from '@krayfaus/essentials';

async function withEssentials() {
    const [response, error] = await resolve(axios.get('/user?ID=12345'));
    if (error) { return handleError(error); }
    const data = String.value(response.data);
    console.log(data);
}

async function withoutEssentials() {
    try {
        const response = await axios.get('/user?ID=12345');
        const data = response.data?.toString() || '';
        console.log(data);
    } catch (error) {
        /* error handling */
    }
}
```

## ⚠️ Disclaimer

The code provided here is opinionated, you may like to write code differently and that's okay.

Feel free to take stuff you find useful from here.

Good luck on your projects!

## 📝 License

This repository is available under the [MIT](https://opensource.org/licenses/MIT) license.