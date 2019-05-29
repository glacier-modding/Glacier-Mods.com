(function() {
    const __exports = {};
    let wasm;

    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }

    let WASM_VECTOR_LEN = 0;

    function passArray8ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 1);
        getUint8Memory().set(arg, ptr / 1);
        WASM_VECTOR_LEN = arg.length;
        return ptr;
    }

    let cachegetUint32Memory = null;
    function getUint32Memory() {
        if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
            cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
        }
        return cachegetUint32Memory;
    }

    function passArray32ToWasm(arg) {
        const ptr = wasm.__wbindgen_malloc(arg.length * 4);
        getUint32Memory().set(arg, ptr / 4);
        WASM_VECTOR_LEN = arg.length;
        return ptr;
    }

    function getArrayU8FromWasm(ptr, len) {
        return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
    }

    let cachedGlobalArgumentPtr = null;
    function globalArgumentPtr() {
        if (cachedGlobalArgumentPtr === null) {
            cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
        }
        return cachedGlobalArgumentPtr;
    }
    /**
    * Enciphers the buffer.
    * @param {Uint8Array} data
    * @param {number} delta
    * @param {Uint8Array} header
    * @param {number} rounds
    * @param {Uint32Array} key
    * @returns {Uint8Array}
    */
    __exports.encipher = function(data, delta, header, rounds, key) {
        const ptr0 = passArray8ToWasm(data);
        const len0 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm(header);
        const len2 = WASM_VECTOR_LEN;
        const ptr4 = passArray32ToWasm(key);
        const len4 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        wasm.encipher(retptr, ptr0, len0, delta, ptr2, len2, rounds, ptr4, len4);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        if (rustptr === 0) return;
        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    };

    /**
    * Decipherd the buffer.
    * @param {Uint8Array} data
    * @param {number} delta
    * @param {Uint8Array} header
    * @param {number} rounds
    * @param {Uint32Array} key
    * @returns {Uint8Array}
    */
    __exports.decipher = function(data, delta, header, rounds, key) {
        const ptr0 = passArray8ToWasm(data);
        const len0 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm(header);
        const len2 = WASM_VECTOR_LEN;
        const ptr4 = passArray32ToWasm(key);
        const len4 = WASM_VECTOR_LEN;
        const retptr = globalArgumentPtr();
        wasm.decipher(retptr, ptr0, len0, delta, ptr2, len2, rounds, ptr4, len4);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        if (rustptr === 0) return;
        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    };

    function init(module) {
        let result;
        const imports = { './hitwasm_xtea': __exports };

        if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

            const response = fetch(module);
            if (typeof WebAssembly.instantiateStreaming === 'function') {
                result = WebAssembly.instantiateStreaming(response, imports)
                .catch(e => {
                    console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                    return response
                    .then(r => r.arrayBuffer())
                    .then(bytes => WebAssembly.instantiate(bytes, imports));
                });
            } else {
                result = response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            }
        } else {

            result = WebAssembly.instantiate(module, imports)
            .then(result => {
                if (result instanceof WebAssembly.Instance) {
                    return { instance: result, module };
                } else {
                    return result;
                }
            });
        }
        return result.then(({instance, module}) => {
            wasm = instance.exports;
            init.__wbindgen_wasm_module = module;

            return wasm;
        });
    }

    self.wasm_bindgen = Object.assign(init, __exports);

})();
