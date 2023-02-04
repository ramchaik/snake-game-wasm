import { rnd } from './snippets/snake-game-64c74d28f4ad06b4/www/utils/rnd.js';

let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
*/
export const Direction = Object.freeze({ Left:0,"0":"Left",Right:1,"1":"Right",Up:2,"2":"Up",Down:3,"3":"Down", });
/**
*/
export const GameStatus = Object.freeze({ Won:0,"0":"Won",Lost:1,"1":"Lost",Played:2,"2":"Played", });
/**
*/
export class SnakeCell {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_snakecell_free(ptr);
    }
}
/**
*/
export class World {

    static __wrap(ptr) {
        const obj = Object.create(World.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} snake_index
    * @returns {World}
    */
    static new(width, snake_index) {
        var ret = wasm.world_new(width, snake_index);
        return World.__wrap(ret);
    }
    /**
    */
    start_game() {
        wasm.world_start_game(this.ptr);
    }
    /**
    * @returns {number | undefined}
    */
    game_status() {
        var ret = wasm.world_game_status(this.ptr);
        return ret === 3 ? undefined : ret;
    }
    /**
    * @returns {string}
    */
    game_status_text() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.world_game_status_text(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {number}
    */
    width() {
        var ret = wasm.world_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    snake_head_idx() {
        var ret = wasm.world_snake_head_idx(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number | undefined}
    */
    reward_cell() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.world_reward_cell(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return r0 === 0 ? undefined : r1 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} direction
    */
    change_snake_dir(direction) {
        wasm.world_change_snake_dir(this.ptr, direction);
    }
    /**
    * @returns {number}
    */
    points() {
        var ret = wasm.world_points(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    snake_length() {
        var ret = wasm.world_snake_length(this.ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    snake_cells() {
        var ret = wasm.world_snake_cells(this.ptr);
        return ret;
    }
    /**
    */
    step() {
        wasm.world_step(this.ptr);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('snake_game_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_rnd_500f252887f46c6a = function(arg0) {
        var ret = rnd(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

