//@name imagine
//@display-name 🎨 이매진 v3.79.0
//@api 3.0
//@version 3.79.0
//@arg nai_api_key string NovelAI API 키 (pst- 로 시작하는 영구 토큰)

(async () => {
    'use strict';
    const api = typeof Risuai !== 'undefined' ? Risuai : risuai;
    const LOG = '[이매진]';
    const VERSION = '3.79.0';
    const DEV_URL = 'https://github.com/daelar99-rgb';
    const GH_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
    const doc = document;

    const DEFAULT_POS = '0.4::artist:solipsist ::, 0.2::artist:ebora ::, 0.8::artist:tianliang duohe fangdongye ::, 0.9::artist:freng ::, 0.9::artist:modare ::, 0.3::artist:balecxi ::, 0.3::artist:miyu ::, 0.2::artist:chamchami (cham22) ::, 1.2::artist:xipa ::, 0.4::artist:satou kukki ::, 0.9::artist:sohn woohyoung ::, 1.2::artist:ryusei hasida ::, 0.8::artist:healthyman ::, 0.8::artist:channel (caststation) ::, 0.8::artist:conto ::, 0.4::artist:mizumizuni ::, 0.6::artist:ie (raarami) ::, 0.5::artist:jp06 ::, 1.2::artist:horikoshi kohei ::, year 2026, year 2025, -5::artist collaboration ::, -1::flat color ::, masterpiece, very aesthetic, highres, incredibly absurdres, best quality, best illustration, 0.4::blender (medium), photorealistic ::, high complexity, glossy cloth, 2::sound effects ::, motion blur, motion lines,';
    const DEFAULT_NEG = 'dithering, halftone, screentone, negative space, blank page, logo, watermark, too many watermarks, reference, signature, artist name, subtitles, captions, dated, chibi, artistic error, scan artifacts, jpeg artifacts, aliasing, film grain, heavy film grain, chromatic aberration, digital dissolve, artist:xinzoruo, artist:milkpanda, artist:kurukurumagical, artist collaboration, one-hour drawing challenge, 4koma, detailed nose, fat, muscular, athletic, toned body, 2::mutated, mutation, deformed, distorted, disfigured, bad anatomy ::, unnatural hair, bad face, mob face, cloned face, distorted face, poorly drawn face, ugly, bad eyes, empty eyes, extra eyes, lazy eye, asymmetrical eyes, cross-eyed, bad proportions, wrong body proportions, unrealistic proportions, distorted body, long neck, wrong head size, bad limbs, missing limbs, extra limbs, amputee, bad arm, 2::bad hands, malformed hands, poorly drawn hands, bad hand structure, extra digits, fewer digits, extra fingers, fused fingers ::, bad leg, extra leg, distorted composition, bad perspective, multiple views, disorganized colors, unrealistic colors, unfinished, incomplete, displeasing, very displeasing, unsatisfactory, inadequate, deficient, subpar, poor, blurry, lowres, duplicate, worst quality, bad quality, messy details, fewer details, bad portrait, bad illustration, awkward, bad posture, simple background,';
    const DEFAULT_PRESET = { id: 'default', name: '프리셋1 (v5f)', pos: DEFAULT_POS, neg: DEFAULT_NEG };
    const OLD_DEFAULT_NAME = '기본 작가';
    const OLD_PRESET2_NAME = '프리셋2 (v4f)';

    const PRESET2_POS = '2::artist:imamura ryou::, 1.5::artist:loliconder::, 1.5::artist:shigure s::, 1.5::artist:jabara tornado::, ::artist:teshima nari::, 0.5::artist:kerorira::, ::artist:fellatrix::, 2::artist:meme50 ::, 6::jaggy lines, cel shading, anime coloring::, -2::artist collaboration::, year 2025, year 2024, year 2023, -2::flat color, monochrome, upscaled, blurry::, -2::signature, artist name, artist socials, censored::, highres, absurdres, masterpiece, very aesthetic, best illustration';
    const PRESET2_NEG = 'logo, watermark, too many watermarks, blank page, text-only page, reference, username, signature, artist:xinzoruo, 2::artist:milkpanda::, artist:khyle., artist:bkub, artist:gaoo (frpjx283), 15::artist collaboration::, variant set, large variant set, 4koma, 2koma, turnaround, film grain, monochrome, dithering, halftone, screentones, dated, 1990s (style), mutation, deformed, distorted, disfigured, artistic error, distorted anatomy, anatomical structure error, asymmetrical face, unnatural hair, bad eyes, empty eyes, blank eyes, bad proportions, bad limb, extra digits, fewer digits, bad legs, extra legs, amputee, distorted composition, bad perspective, multiple views, negative space, animation error, chromatic aberration, disorganized colors, scan artifacts, jpeg artifacts, vertical lines, vertical banding, worst quality, bad quality, lowres, blurry, upscaled, fewer details, unfinished, incomplete, amateur, unsatisfactory, displeasing, very displeasing, bad illustration, bad portrait, puckered lips, thick lips, bags under eyes';
    const PRESET2 = { id: 'preset2', name: '프리셋2 (v4.5f)', pos: PRESET2_POS, neg: PRESET2_NEG };

    const PRESET3_POS = '2::motion lines, motion blur::, 1.2::artist:ask (askzy)::, 1.2::artist:hito (nito) ::, 1::sketch, jaggy lines, sketch lines, unfinished, messy lines ::, 2::spot color, monochrome::, rough sketch, limited palette, 2::DOF::, 2::dynamic angle::, 1::vanishing point::, 1.5::Sense of space::';
    const PRESET3_NEG = 'dithering, halftone, screentone, negative space, blank page, logo, watermark, too many watermarks, reference, signature, artist name, subtitles, captions, dated, chibi, artistic error, scan artifacts, jpeg artifacts, aliasing, film grain, heavy film grain, chromatic aberration, digital dissolve, artist:xinzoruo, artist:milkpanda, artist:kurukurumagical, artist collaboration, one-hour drawing challenge, 4koma, detailed nose, fat, muscular, athletic, toned body, 2::mutated, mutation, deformed, distorted, disfigured, bad anatomy::, unnatural hair, bad face, mob face, cloned face, distorted face, poorly drawn face, ugly, bad eyes, empty eyes, extra eyes, lazy eye, asymmetrical eyes, cross-eyed, bad proportions, wrong body proportions, unrealistic proportions, distorted body, long neck, wrong head size, bad limbs, missing limbs, extra limbs, amputee, bad arm, 2::bad hands, poorly drawn hands, bad hand structure, extra digits, fewer digits, extra fingers, fused fingers::, bad leg, extra leg, distorted composition, bad perspective, multiple views, displeasing, very displeasing, unsatisfactory, inadequate, deficient, subpar, poor, blurry, lowres, duplicate, worst quality, bad quality, messy details, fewer details, bad portrait, bad illustration, awkward, bad posture, simple background';

    const OLD_PRESET3_POS = '2::motion lines, motion blur::, 1.2::artist:ask (askzy)::, 1.2::artist:hito (nito) ::, 1.5::sketch, jaggy lines, sketch lines, unfinished, messy lines ::, 2::spot color, monochrome::, rough sketch, limited palette, 2::DOF::, out focus, very aesthetic, masterpiece';
    const OLD_PRESET3_NEG = 'dithering, halftone, screentone, negative space, blank page, logo, watermark, too many watermarks, reference, signature, artist name, subtitles, captions, dated, chibi, artistic error, scan artifacts, jpeg artifacts, aliasing, film grain, heavy film grain, chromatic aberration, digital dissolve, artist:xinzoruo, artist:milkpanda, artist:kurukurumagical, artist collaboration, one-hour drawing challenge, 4koma, detailed nose, fat, muscular, athletic, toned body, 2::mutated, mutation, deformed, distorted, disfigured, bad anatomy::, unnatural hair, bad face, mob face, cloned face, distorted face, poorly drawn face, ugly, bad eyes, empty eyes, extra eyes, lazy eye, asymmetrical eyes, cross-eyed, bad proportions, wrong body proportions, unrealistic proportions, distorted body, long neck, wrong head size, bad limbs, missing limbs, extra limbs, amputee, bad arm, 2::bad hands, malformed hands, poorly drawn hands, bad hand structure, extra digits, fewer digits, extra fingers, fused fingers::, bad leg, extra leg, distorted composition, bad perspective, multiple views, displeasing, very displeasing, unsatisfactory, inadequate, deficient, subpar, poor, blurry, lowres, duplicate, worst quality, bad quality, messy details, fewer details, bad portrait, bad illustration, awkward, bad posture, simple background';
    const PRESET3 = { id: 'preset3', name: '프리셋3 (v5f)', pos: PRESET3_POS, neg: PRESET3_NEG };

    const ARTIST1 = { id: 'artist1', name: '프리셋1', pos: '0.4::artist:solipsist::, 0.2::artist:ebora::, 0.8::artist:tianliang duohe fangdongye::, 0.9::artist:freng::, 0.9::artist:modare::, 0.3::artist:balecxi::, 0.3::artist:miyu::, 0.2::artist:chamchami (cham22)::, 1.2::artist:xipa::, 0.4::artist:satou kukki::, 0.9::artist:sohn woohyoung::, 1.2::artist:ryusei hasida::, 0.8::artist:healthyman::, 0.8::artist:channel (caststation)::, 0.7::artist:conto::, 0.4::artist:mizumizuni::, 0.6::artist:ie (raarami)::, 0.5::artist:jp06 ::, 0.3::artist:freng::, 0.3::artist:modare::, 1.2::artist:horikoshi kohei::, year 2026, -5::artist collaboration::, -1::flat color::, masterpiece, very aesthetic, highres, absurdres, best quality, best illustration, 0.4::blender (medium), photorealistic::, no lineart, -2::picture frame, photo (object)::, high complexity', neg: 'dithering, halftone, screentone, negative space, blank page, logo, watermark, too many watermarks, reference, signature, artist name, subtitles, captions, dated, chibi, artistic error, scan artifacts, jpeg artifacts, aliasing, film grain, heavy film grain, chromatic aberration, digital dissolve, artist:xinzoruo, artist:milkpanda, artist:kurukurumagical, artist collaboration, one-hour drawing challenge, 4koma, 2koma, detailed nose, 2::mutated, mutation, deformed, distorted, disfigured, bad anatomy::, unnatural hair, bad face, mob face, cloned face, distorted face, poorly drawn face, ugly, bad eyes, empty eyes, extra eyes, lazy eye, asymmetrical eyes, cross-eyed, bad proportions, wrong body proportions, unrealistic proportions, distorted body, long neck, wrong head size, bad limbs, missing limbs, extra limbs, amputee, bad arm, 2::bad hands, malformed hands, poorly drawn hands, bad hand structure, extra digits, fewer digits, extra fingers, fused fingers::, bad leg, extra leg, distorted composition, bad perspective, multiple views, disorganized colors, unrealistic colors, unfinished, incomplete, displeasing, very displeasing, unsatisfactory, inadequate, deficient, subpar, poor, blurry, lowres, duplicate, worst quality, bad quality, messy details, fewer details, bad portrait, bad illustration, awkward, bad posture', steps: 28, scale: 5, cfgRescale: 0.3, sampler: 'k_euler_ancestral' };
    const ARTIST2 = { id: 'artist2', name: '프리셋2', pos: '0.55::artist:rehu_(astd5787)::, 0.55::artist:ebora::, 0.7::artist:shindol::, 0.45::artist:reagan_long::, 0.45::artist:hitobashira_(1746164306)::, 0.6::artist:owler::, 0.6::artist:masoq::, 0.7::artist:sparrowl::, year 2025, year 2026, newest, 1.5::high complexity::, masterpiece, best quality, very aesthetic, absurdres, crisp shading, expert shading, high detail, dot nose, detailed background, -4::artist collaboration::, -2::simple illustration::, -2::monochrome, film grain, watercolor (medium)::, -2::official style, official art::, -2::no lineart::, -2::flat color::', neg: 'negative space, blank page, logo, watermark, too many watermarks, reference, signature, artist name, artist logo, subtitles, captions, dated, chibi, artistic error, scan artifacts, jpeg artifacts, aliasing, film grain, heavy film grain, dithering, chromatic aberration, digital dissolve, halftone, screentone, artist:xinzoruo, artist:milkpanda, artist:kurukurumagical, artist collaboration, one-hour drawing challenge, 4koma, 2koma, mutated, mutation, deformed, distorted, disfigured, bad anatomy, unnatural hair, bad face, mob face, cloned face, distorted face, poorly drawn face, ugly, bad eyes, empty eyes, extra eyes, lazy eye, asymmetrical eyes, cross-eyed, blurry eyes, bad proportions, wrong body proportions, unrealistic proportions, distorted body, long neck, wrong head size, bad limbs, missing limbs, extra limbs, amputee, bad arm, bad hands, malformed hands, poorly drawn hands, bad hand structure, extra digits, fewer digits, extra fingers, fused fingers, bad leg, extra leg, distorted composition, bad perspective, multiple views, disorganized colors, muted color, unrealistic colors, unfinished, incomplete, displeasing, very displeasing, unsatisfactory, inadequate, deficient, subpar, poor, blurry, lowres, duplicate, worst quality, bad quality, messy details, fewer details, bad portrait, bad illustration, awkward, bad posture', steps: 27, scale: 7, cfgRescale: 0.4, sampler: 'k_euler_ancestral' };

    const ARTIST3 = { id: 'artist3', name: '이매진 그림체 (삽화용)', pos: '0.5::utsuro (gokurakugai)::, 0.5::artist:sorani (kaeru0768)::, 0.5::artist:dishwasher1910 ::, 0.6::artist:patzzi::, 0.6::artist:ichigoh::, 0.4::artist:shion 343 ::, 0.4::artist:kim eb::, 0.3::artist:weiyan (nbnbmwnl)::, 0.5::artist:mi 398 ::, 0.4::artist:lemonail::, 2::sketch, jaggy lines, sketch lines, unfinished, messy lines, rough sketch, dynamic angle, DOF, vanishing point, Sense of space::', neg: 'dithering, halftone, screentone, negative space, blank page, logo, watermark, too many watermarks, reference, signature, artist name, subtitles, captions, dated, chibi, artistic error, scan artifacts, jpeg artifacts, aliasing, film grain, heavy film grain, chromatic aberration, digital dissolve, artist:xinzoruo, artist:milkpanda, artist:kurukurumagical, artist collaboration, one-hour drawing challenge, 4koma, detailed nose, 2::mutated, mutation, deformed, distorted, disfigured, bad anatomy::, unnatural hair, bad face, mob face, cloned face, distorted face, poorly drawn face, ugly, bad eyes, empty eyes, extra eyes, lazy eye, asymmetrical eyes, cross-eyed, bad proportions, wrong body proportions, unrealistic proportions, distorted body, long neck, wrong head size, bad limbs, missing limbs, extra limbs, amputee, bad arm, 2::bad hands, malformed hands, poorly drawn hands, bad hand structure, extra digits, fewer digits, extra fingers, fused fingers::, bad leg, extra leg, distorted composition, bad perspective, multiple views, displeasing, very displeasing, unsatisfactory, inadequate, deficient, subpar, poor, blurry, lowres, duplicate, worst quality, bad quality, messy details, fewer details, bad portrait, bad illustration, awkward, bad posture, simple background' };

    const ARTIST4 = { id: 'artist4', name: '이매진 그림체 (삽화용)', pos: '0.5::utsuro (gokurakugai)::, 0.5::artist:sorani (kaeru0768) ::, 0.5::artist:dishwasher1910 ::, 0.6::artist:patzzi ::, 0.6::artist:ichigoh ::, 0.4::artist:shion 343 ::, 0.4::artist:kim eb ::, 0.3::artist:weiyan (nbnbmwnl) ::, 0.5::artist:mi 398 ::, 0.4::artist:lemonail ::, 2::sketch, jaggy lines, sketch lines, unfinished, messy lines, rough sketch, dynamic angle, DOF, dramatic angle::, very aesthetic, masterpiece', neg: 'dithering, halftone, screentone, negative space, blank page, logo, watermark, too many watermarks, reference, signature, artist name, subtitles, captions, dated, chibi, artistic error, scan artifacts, jpeg artifacts, aliasing, film grain, heavy film grain, chromatic aberration, digital dissolve, artist:xinzoruo, artist:milkpanda, artist:kurukurumagical, artist collaboration, one-hour drawing challenge, 4koma, detailed nose, 2::mutated, mutation, deformed, distorted, disfigured, bad anatomy::, unnatural hair, bad face, mob face, cloned face, distorted face, poorly drawn face, unfinished face, simple face, ugly, bad eyes, empty eyes, extra eyes, lazy eye, asymmetrical eyes, cross-eyed, bad proportions, wrong body proportions, unrealistic proportions, distorted body, long neck, wrong head size, bad limbs, missing limbs, extra limbs, amputee, bad arm, 2::bad hands, malformed hands, poorly drawn hands, bad hand structure, extra digits, fewer digits, extra fingers, fused fingers::, bad leg, extra leg, distorted composition, bad perspective, multiple views, displeasing, very displeasing, unsatisfactory, inadequate, deficient, subpar, poor, blurry, lowres, duplicate, worst quality, bad quality, messy details, fewer details, bad portrait, bad illustration, awkward, bad posture, simple background, sepia, white haze' };

    const OLD_ARTIST4_POS = '0.5::utsuro (gokurakugai)::, 0.5::artist:sorani (kaeru0768) ::, 0.5::artist:dishwasher1910 ::, 0.6::artist:patzzi ::, 0.6::artist:ichigoh ::, 0.4::artist:shion 343 ::, 0.4::artist:kim eb ::, 0.3::artist:weiyan (nbnbmwnl) ::, 0.5::artist:mi 398 ::, 0.4::artist:lemonail ::, 2::sketch, jaggy lines, sketch lines, unfinished, messy lines, rough sketch, dynamic angle, DOF, vanishing point, Sense of space, dramatic angle::';

    const OLD_ARTIST4_POS_3 = '0.5::utsuro (gokurakugai)::, 0.5::artist:sorani (kaeru0768) ::, 0.5::artist:dishwasher1910 ::, 0.6::artist:patzzi ::, 0.6::artist:ichigoh ::, 0.4::artist:shion 343 ::, 0.4::artist:kim eb ::, 0.3::artist:weiyan (nbnbmwnl) ::, 0.5::artist:mi 398 ::, 0.4::artist:lemonail ::, 2::sketch, jaggy lines, sketch lines, unfinished, messy lines, rough sketch, dynamic angle, DOF, vanishing point, Sense of space, dramatic angle::, very aesthetic, masterpiece';
    const OLD_ARTIST4_POS_2 = OLD_ARTIST4_POS_3 + ', no text';
    const OLD_ARTIST4_NEG = 'dithering, halftone, screentone, negative space, blank page, logo, watermark, too many watermarks, reference, signature, artist name, subtitles, captions, dated, chibi, artistic error, scan artifacts, jpeg artifacts, aliasing, film grain, heavy film grain, chromatic aberration, digital dissolve, artist:xinzoruo, artist:milkpanda, artist:kurukurumagical, artist collaboration, one-hour drawing challenge, 4koma, detailed nose, fat, male, man, muscular, athletic, toned body, 2::mutated, mutation, deformed, distorted, disfigured, bad anatomy::, unnatural hair, bad face, mob face, cloned face, distorted face, poorly drawn face, unfinished face, simple face, ugly, bad eyes, empty eyes, extra eyes, lazy eye, asymmetrical eyes, cross-eyed, bad proportions, wrong body proportions, unrealistic proportions, distorted body, long neck, wrong head size, bad limbs, missing limbs, extra limbs, amputee, bad arm, 2::bad hands, malformed hands, poorly drawn hands, bad hand structure, extra digits, fewer digits, extra fingers, fused fingers::, bad leg, extra leg, distorted composition, bad perspective, multiple views, displeasing, very displeasing, unsatisfactory, inadequate, deficient, subpar, poor, blurry, lowres, duplicate, worst quality, bad quality, messy details, fewer details, bad portrait, bad illustration, awkward, bad posture, simple background';

    const NEG_BIAS_TAGS = ['fat', 'chubby', 'plump', 'obese', 'muscular', 'muscular male', 'muscular female', 'athletic', 'toned body', 'male', 'man', '1boy', 'old', 'old man', 'old woman', 'elderly', 'dark skin', 'dark-skinned male', 'dark-skinned female', 'tan', 'thick lips', 'puckered lips', 'bags under eyes'];

    const BUILTIN_PRESETS = [ARTIST4, ARTIST1, ARTIST2];

    const BUILTIN_THUMB = {
        artist4: 'data:image/webp;base64,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',
        artist1: 'data:image/webp;base64,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',
        artist2: 'data:image/webp;base64,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',
    };

    const MONO_DROP_RE = /,\s*(?:spot color|monochrome|limited palette)(?=\s*(?:,|::))/g;
    const OLD_BUILTIN_IDS = [DEFAULT_PRESET.id, PRESET2.id, PRESET3.id];

    const COMIC_TAGS = '1.3::comic, multiple panels, manga::, 1.1::panel borders, varied panel sizes::, varied panel one-page manga, white border';

    const NEG_V12 = DEFAULT_NEG.replace('detailed nose, fat, muscular', 'detailed nose, fat, male, man, muscular');

    const NAI_URL = 'https://image.novelai.net/ai/generate-image';
    const MODELS = [
        ['nai-diffusion-4-5-full', 'V4.5 Full'],
        ['nai-diffusion-4-5-curated', 'V4.5 Curated'],
        ['nai-diffusion-5-full', 'V5 Full'],
        ['nai-diffusion-5-curated', 'V5 Curated'],
    ];
    const SAMPLERS = [
        ['k_euler_ancestral', 'Euler A'],
        ['k_euler', 'Euler'],
        ['k_dpmpp_2s_ancestral', 'DPM++ 2S A'],
        ['k_dpmpp_2m_sde', 'DPM++ 2M SDE'],
        ['k_dpmpp_2m', 'DPM++ 2M'],
    ];

    const SIZES = { tall: [832, 1216], wide: [1216, 832], tall2: [896, 1152], wide2: [1152, 896], square: [1024, 1024] };
    const SIZE_OPTS = [['tall', '세로 832×1216'], ['wide', '가로 1216×832'], ['tall2', '세로 896×1152'], ['wide2', '가로 1152×896'], ['square', '정사각 1024×1024']];
    const sizeName = k => SIZE_OPTS.find(o => o[0] === k)?.[1] ?? SIZE_OPTS[0][1];
    const modelName = id => MODELS.find(m => m[0] === id)?.[1] ?? id;

    const MAX_SLOTS = 6;
    const MAX_RECORDS = 200;
    const KINDS = [['comic', '만화'], ['illust', '삽화']];
    const DEFAULT_SET = {
        model: 'nai-diffusion-4-5-full',
        auto: true,
        llm: 'submodel',
        acLlm: 'submodel',
        acPresetId: '',
        kind: 'comic',
        count: 1,
        size: 'tall',
        sv: 28,
        bubbles: true,
        loreMax: 0,
        castMax: 0,
        userFirst: false,
        dynamic: true,
        dynMin: 9,
        genre: true,
        steps: 28,
        scale: 5,
        cfgRescale: 0,
        sampler: 'k_euler_ancestral',
        pc: '480',
        mo: '80',
        tap: true,
        ubtn: 'all',
        setup: { llm: false, acLlm: false, model: false, kind: false, count: false, preset: false },
        assetOff: [],
        ptOff: [],
        panelBtn: true,
        webp: true,
        vars: true,
        head: '',
        extra: '',
    };

    const st = {
        set: { ...DEFAULT_SET },
        presets: BUILTIN_PRESETS.map(p => ({ ...p })),
        presetId: ARTIST1.id,
        view: null,
        busy: null,
        note: '', err: '', ok: false,
        promptOpen: new Set(),
        drafts: {},
        persona: null,
        jobs: 0,
    };
    const castCache = new Map();
    const recCache = new Map();

    const save = (key, value) => api.pluginStorage.setItem(key, value).catch(error => console.warn(LOG, 'save', key, error));
    const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6).padEnd(4, '0');
    const randSeed = () => Math.floor(Math.random() * 4294967295);
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    function fnv(s) {
        let x = 0x811c9dc5;
        for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 0x01000193); }
        return (x >>> 0).toString(36);
    }

    const PT_TAG_RE = /<div class="nc-pt[^"]*">(\{\{(?:image|img)::(c_[a-z0-9]+_[a-z0-9]+_[a-z0-9]+)\}\})<\/div>|(\{\{(?:image|img)::(c_[a-z0-9]+_[a-z0-9]+_[a-z0-9]+)\}\})/g;
    const wrapPortraits = text => typeof text === 'string' && text.includes('::c_')
        ? text.replace(PT_TAG_RE, (m, t1, n1, t2, n2) => `<div class="nc-pt nc-pt-${n1 ?? n2}">${t1 ?? t2}</div>`) : text;

    const PT_UNWRAP_RE = /<div class="nc-pt[^"]*">(\{\{(?:image|img)::c_[a-z0-9_]+\}\})<\/div>/g;
    const unwrapPortraits = text => typeof text === 'string' && text.includes('nc-pt') ? text.replace(PT_UNWRAP_RE, '$1') : text;
    const TAG_RE = /\s*(?:<div class="nc-fig[^"]*">\{\{(?:image|img)::nc_[a-z0-9_]+\}\}<\/div>|\{\{(?:image|img)::nc_[a-z0-9_]+\}\})/gi;
    const figTag = name => `<div class="nc-fig nc-id-${name}">{{image::${name}}}</div>`;

    const PC_SIZES = [['240', '240'], ['320', '320'], ['400', '400'], ['480', '480'], ['560', '560']];
    const MO_SIZES = [['20', '20%'], ['40', '40%'], ['60', '60%'], ['80', '80%'], ['100', '100%']];
    const PC_RANGE = [100, 1600];
    const MO_RANGE = [10, 100];
    const sizeOk = ([lo, hi], v) => typeof v === 'string' && /^[1-9]\d*$/.test(v) && +v >= lo && +v <= hi;
    const stripOurs = s => String(s ?? '').replace(TAG_RE, '').replace(/\s+$/, '');
    const msgHash = m => fnv(stripOurs(m?.data));
    const tidy = s => String(s ?? '').replace(/\s+/g, ' ').trim().replace(/^,+|,+$/g, '').trim();

    const joinTags = (...parts) => parts.flat().map(tidy).filter(Boolean).join(', ');

    const withTags = (...parts) => parts.flat().flatMap(s => String(s ?? '').split(',')).map(tidy).filter(Boolean).join(' with ');
    const grid = v => {
        const n = Number(v);
        if (!Number.isFinite(n)) return 0.5;
        return [0.1, 0.3, 0.5, 0.7, 0.9].reduce((a, b) => Math.abs(b - n) < Math.abs(a - n) ? b : a);
    };

    const CELL_COLS = 'ABCDE';
    const CELL_RE = /^\s*([A-E])\s*([1-5])\s*$/i;
    const xyOfCell = cell => {
        const m = CELL_RE.exec(String(cell ?? ''));
        return m ? { x: (1 + CELL_COLS.indexOf(m[1].toUpperCase()) * 2) / 10, y: (1 + (m[2] - 1) * 2) / 10 } : null;
    };
    const cellOf = (x, y) => CELL_COLS[Math.round((grid(x) - 0.1) / 0.2)] + (Math.round((grid(y) - 0.1) / 0.2) + 1);

    const charSlotsOf = req => (req?.slots ?? []).filter(sl => (sl.kind ?? 'char') === 'char');
    const coordsOn = req => !!req?.useCoords && (req.panels ?? 1) === 1 && charSlotsOf(req).length >= 2;
    const clampInt = (v, lo, hi, dflt) => {
        const n = Math.round(Number(v));
        return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
    };

    const varName = name => String(name ?? '').trim().replace(/\s+/g, '_').replace(/[:{}|$]/g, '') || 'x';

    function plainText(s, max) {
        let t = stripOurs(s)

            .replace(/<(Thoughts|think|thinking)>[\s\S]*?<\/\1>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/\{\{(?:img|image|emotion|asset|bg|raw|path|video|audio|bgm|inlay|inlayed)::[^}]*\}\}/gi, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
        if (max && t.length > max) t = t.slice(0, max) + ' …';
        return t;
    }
    const excerpt = (s, n = 60) => {
        const t = plainText(s).replace(/\s+/g, ' ');
        return t.length > n ? t.slice(0, n) + '…' : t;
    };
    function stopError() {
        return Object.assign(new Error('중단했습니다.'), { isStop: true });
    }

    let sizeMoved = false;
    async function loadPrefs() {
        const [set, presets, presetId] = await Promise.all([
            api.pluginStorage.getItem('nc:set').catch(() => null),
            api.pluginStorage.getItem('nc:presets').catch(() => null),
            api.pluginStorage.getItem('nc:preset').catch(() => null),
        ]);
        if (set && typeof set === 'object') {
            st.set = { ...DEFAULT_SET, ...set };

            if (!(set.sv >= 2)) { st.set.count = 1; delete st.set.format; }
            delete st.set.ctx;
            delete st.set.boyFix;

            if (!(set.sv >= 4)) {
                if (!set.ubtn) st.set.ubtn = set.btn === 'none' ? 'none' : 'all';

                st.set.setup = { model: true, kind: true, count: true, preset: true };
            }
            delete st.set.inline;

            delete st.set.botImg;
            delete st.set.botHide;
            delete st.set.btn;
        }
        if (!SIZES[st.set.size]) st.set.size = 'tall';
        if (!sizeOk(PC_RANGE, st.set.pc)) st.set.pc = DEFAULT_SET.pc;
        if (!sizeOk(MO_RANGE, st.set.mo)) st.set.mo = DEFAULT_SET.mo;
        if (!['all', 'last', 'none'].includes(st.set.ubtn)) st.set.ubtn = DEFAULT_SET.ubtn;
        st.set.setup = { ...DEFAULT_SET.setup, ...(st.set.setup && typeof st.set.setup === 'object' ? st.set.setup : {}) };
        st.set.panelBtn = st.set.panelBtn !== false;
        st.set.assetOff = Array.isArray(st.set.assetOff) ? [...new Set(st.set.assetOff.filter(x => typeof x === 'string' && x))] : [];
        st.set.ptOff = Array.isArray(st.set.ptOff) ? [...new Set(st.set.ptOff.filter(x => typeof x === 'string' && x))] : [];
        if (Array.isArray(presets) && presets.length) st.presets = presets.filter(p => p && p.id);

        if (set && typeof set === 'object' && !(set.sv >= 3)) {
            for (const p of st.presets) if (p.neg === NEG_V12) p.neg = DEFAULT_NEG;
            savePresets();
        }
        if (set && typeof set === 'object' && !(set.sv >= 4)) {
            st.set.sv = 4;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 5)) {
            if (st.set.setup.kind) st.set.setup.model = true;
            st.set.sv = 5;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 6)) {
            st.set.panelBtn = true;
            st.set.sv = 6;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 8) && st.presets.length) {
            st.presets = st.presets.filter(p => p.id !== 'comic');
            const d = st.presets.find(p => p.id === DEFAULT_PRESET.id);
            if (d && d.name === OLD_DEFAULT_NAME) d.name = DEFAULT_PRESET.name;
            if (!st.presets.some(p => p.id === PRESET2.id)) st.presets.push({ ...PRESET2 });
            save('nc:presets', st.presets);
            st.set.sv = 8;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 9)) {
            if (st.set.pc === '400') { st.set.pc = DEFAULT_SET.pc; sizeMoved = true; }
            if (st.set.mo === '100') { st.set.mo = DEFAULT_SET.mo; sizeMoved = true; }
            st.set.sv = 9;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 10)) {
            const p2 = st.presets.find(p => p.id === PRESET2.id);
            if (p2 && p2.name === OLD_PRESET2_NAME) { p2.name = PRESET2.name; save('nc:presets', st.presets); }
            if (st.set.setup?.kind) st.set.setup = { ...st.set.setup, preset: true };
            st.set.sv = 10;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 11)) {
            st.set.acLlm = st.set.llm === 'model' ? 'model' : 'submodel';
            st.set.sv = 11;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 12)) {
            const su = st.set.setup ?? {};
            if (su.model || su.kind || su.preset || su.count) st.set.setup = { ...su, llm: true };
            st.set.sv = 12;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 13) && st.presets.length) {
            if (!st.presets.some(p => p.id === PRESET3.id)) { st.presets.push({ ...PRESET3 }); save('nc:presets', st.presets); }
            st.set.sv = 13;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 14)) {
            const p3 = st.presets.find(p => p.id === PRESET3.id);
            if (p3 && (p3.pos === OLD_PRESET3_POS || p3.neg === OLD_PRESET3_NEG)) {
                if (p3.pos === OLD_PRESET3_POS) p3.pos = PRESET3.pos;
                if (p3.neg === OLD_PRESET3_NEG) p3.neg = PRESET3.neg;
                save('nc:presets', st.presets);
            }
            st.set.sv = 14;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 15) && st.presets.length) {
            st.presets = [...BUILTIN_PRESETS.map(p => ({ ...p })), ...st.presets.filter(p => !OLD_BUILTIN_IDS.includes(p.id) && !BUILTIN_PRESETS.some(b => b.id === p.id))];
            if (!st.presets.some(p => p.id === presetId)) save('nc:preset', ARTIST1.id);
            save('nc:presets', st.presets);
            st.set.sv = 15;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 16) && st.presets.length) {
            if (!st.presets.some(p => p.id === ARTIST3.id)) { st.presets.push({ ...ARTIST3 }); save('nc:presets', st.presets); }
            st.set.sv = 16;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 17)) {
            const fix = t => typeof t === 'string' ? t.replace(/(artist:(?:jp06|dishwasher1910|shion 343|mi 398))::/g, '$1 ::') : t;
            let changed = false;
            for (const x of st.presets) { const a = fix(x.pos), b = fix(x.neg); if (a !== x.pos || b !== x.neg) { x.pos = a; x.neg = b; changed = true; } }
            if (changed) save('nc:presets', st.presets);
            st.set.sv = 17;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 18)) {
            const x = st.presets.find(q => q.id === ARTIST3.id);
            if (x && typeof x.pos === 'string') {
                const pos = x.pos.replace(MONO_DROP_RE, '');
                if (pos !== x.pos) { x.pos = pos; save('nc:presets', st.presets); }
            }
            st.set.sv = 18;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 19)) {
            const x = st.presets.find(q => q.id === ARTIST3.id);
            if (x && x.name === '이매진 그림체') { x.name = ARTIST3.name; save('nc:presets', st.presets); }
            st.set.sv = 19;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 20) && st.presets.length) {
            if (!st.presets.some(p => p.id === ARTIST4.id)) { st.presets.push({ ...ARTIST4 }); save('nc:presets', st.presets); }
            st.set.sv = 20;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 21)) {
            const x = st.presets.find(q => q.id === ARTIST4.id);
            if (x && (x.pos === OLD_ARTIST4_POS || x.neg === OLD_ARTIST4_NEG)) {
                if (x.pos === OLD_ARTIST4_POS) x.pos = ARTIST4.pos;
                if (x.neg === OLD_ARTIST4_NEG) x.neg = ARTIST4.neg;
                save('nc:presets', st.presets);
            }
            st.set.sv = 21;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 22)) {
            const x = st.presets.find(q => q.id === ARTIST4.id);
            if (x && x.pos === OLD_ARTIST4_POS_2) { x.pos = ARTIST4.pos; save('nc:presets', st.presets); }
            st.set.sv = 22;
            saveSet();
        }

        let moved = null;
        if (set && typeof set === 'object' && !(set.sv >= 23)) {
            const had = st.presets.some(q => q.id === ARTIST3.id);
            if (had) st.presets = st.presets.filter(q => q.id !== ARTIST3.id);
            const x = st.presets.find(q => q.id === ARTIST4.id);
            if (x && x.name === '이매진 그림체 2') x.name = ARTIST4.name;
            if (presetId === ARTIST3.id) { moved = x ? x.id : (st.presets[0]?.id ?? ARTIST1.id); save('nc:preset', moved); }
            if (had || x) save('nc:presets', st.presets);
            st.set.sv = 23;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 24)) {
            const x = st.presets.find(q => q.id === ARTIST4.id);
            if (x && typeof x.pos === 'string' && x.pos.includes('rough sketch, dynamic angle, DOF, vanishing point, Sense of space, dramatic angle::')) {
                x.pos = x.pos.replace('rough sketch, dynamic angle, DOF, vanishing point, Sense of space, dramatic angle::', 'rough sketch, dynamic angle, DOF, dramatic angle::');
                save('nc:presets', st.presets);
            }
            st.set.sv = 24;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 25)) {
            st.set.webp = true;
            st.set.sv = 25;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 26)) {
            const x = st.presets.find(q => q.id === ARTIST4.id);
            if (x && typeof x.neg === 'string') {
                const neg = dropTags(x.neg, ['ai-generated']).trim().replace(/^,\s*|,\s*$/g, '');
                if (neg !== x.neg) { x.neg = neg; save('nc:presets', st.presets); }
                const has = t => x.neg.split(',').some(p => tagCore(p) === t);
                const add = ['unfinished face', 'simple face'].filter(t => !has(t));
                if (add.length) {
                    const at = x.neg.indexOf('poorly drawn face');
                    x.neg = at >= 0
                        ? x.neg.slice(0, at + 'poorly drawn face'.length) + ', ' + add.join(', ') + x.neg.slice(at + 'poorly drawn face'.length)
                        : joinTags(x.neg, add.join(', '));
                    save('nc:presets', st.presets);
                }
            }
            st.set.sv = 26;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 27)) {
            let changed = false;
            for (const p of st.presets) {
                if (!p || typeof p.neg !== 'string') continue;
                const neg = dropNegBias(p.neg);
                if (neg !== p.neg) { p.neg = neg; changed = true; }
            }
            if (changed) save('nc:presets', st.presets);
            st.set.sv = 27;
            saveSet();
        }

        if (set && typeof set === 'object' && !(set.sv >= 28)) {
            const i = st.presets.findIndex(p => p?.id === ARTIST4.id);
            if (i > 0) { st.presets.unshift(...st.presets.splice(i, 1)); save('nc:presets', st.presets); }
            st.set.sv = 28;
            saveSet();
        }

        st.set.tap = true;
        if (!st.presets.length) st.presets = BUILTIN_PRESETS.map(p => ({ ...p }));
        const want = moved ?? presetId;
        st.presetId = st.presets.some(p => p.id === want) ? want : st.presets[0].id;
    }
    const saveSet = () => save('nc:set', st.set);
    const savePresets = () => { save('nc:presets', st.presets); save('nc:preset', st.presetId); };
    const preset = () => st.presets.find(p => p.id === st.presetId) ?? st.presets[0] ?? ARTIST1;
    const acPreset = () => st.presets.find(p => p.id === st.set.acPresetId) ?? preset();

    const presetGen = p => ({
        steps: clampInt(p?.steps ?? st.set.steps, 1, 50, 28),
        scale: Math.min(10, Math.max(1, Number(p?.scale ?? st.set.scale) || 5)),
        cfgRescale: Math.min(1, Math.max(0, Number(p?.cfgRescale ?? st.set.cfgRescale) || 0)),
        sampler: SAMPLERS.some(([v]) => v === (p?.sampler ?? st.set.sampler)) ? p?.sampler ?? st.set.sampler : 'k_euler_ancestral',
    });

    async function loadCast(chaId) {
        if (castCache.has(chaId)) return castCache.get(chaId);
        const v = await api.pluginStorage.getItem('nc:cast:' + chaId).catch(() => null);
        const cast = v && Array.isArray(v.list) ? v : { list: [], at: 0 };
        cast.list = cast.list.filter(e => e && typeof e === 'object').map(normCast);
        castCache.set(chaId, cast);
        return cast;
    }
    const saveCast = (chaId, cast) => save('nc:cast:' + chaId, cast);

    async function loadRecs(chaId) {
        if (recCache.has(chaId)) return recCache.get(chaId);
        const v = await api.pluginStorage.getItem('nc:img:' + chaId).catch(() => null);
        const recs = v && typeof v === 'object' ? v : {};
        recCache.set(chaId, recs);
        return recs;
    }
    function saveRecs(chaId, recs) {
        const keys = Object.keys(recs);
        if (keys.length > MAX_RECORDS) {
            keys.sort((a, b) => (recs[a].at ?? 0) - (recs[b].at ?? 0));
            for (const k of keys.slice(0, keys.length - MAX_RECORDS)) delete recs[k];
        }
        return save('nc:img:' + chaId, recs);
    }

    const WEAR = [
        ['hairstyle', '헤어 스타일', '머리'], ['bangs', '앞머리', '머리'], ['haircolor', '머리색', '머리'],
        ['eyes', '눈색', '몸'], ['height', '키', '몸'], ['body', '몸 사이즈', '몸'],
        ['top', '상의', '옷'], ['bottom', '하의', '옷'], ['shoes', '신발', '옷'],
    ];
    const WEAR_KEYS = WEAR.map(w => w[0]);
    const LOOK_AT = WEAR_KEYS.indexOf('top');
    const emptyWear = () => Object.fromEntries(WEAR_KEYS.map(k => [k, '']));

    const isNone = v => /^(?:none|없음)$/i.test(tidy(v));

    const HEADWEAR = /\b(?:hat|cap|beret|beanie|hood|helmet|crown|tiara|visor|bonnet|headdress|headscarf|turban|headwear|veil|circlet)\b/i;
    const COVERS_BOTTOM = /\b(?:dress|one-piece|gown|robe|kimono|yukata|leotard|bodysuit|swimsuit|jumpsuit|overalls|bikini|cheongsam|qipao)\b/i;
    function absentTags(val, none) {
        const out = [];
        if (!HEADWEAR.test(joinTags(val('hairstyle'), val('top')))) out.push('no headwear');
        if (none('top')) out.push('topless');
        if (none('bottom') && !COVERS_BOTTOM.test(val('top'))) out.push('bottomless');
        if (none('shoes')) out.push('no shoes');
        return out;
    }

    const BODY_AT = WEAR_KEYS.indexOf('height');

    let wearBrief = false;
    const OUTFIT_KEYS = ['top', 'bottom', 'shoes'];
    const briefWear = v => tidy(String(v ?? '').split(',').map(tidy).find(Boolean)?.replace(/\s+with\s+.*$/i, ''));
    const identTags = (type, look, val, none = () => false) => {
        const v = WEAR_KEYS.map(k => !wearBrief ? val(k) : k === 'bangs' ? '' : OUTFIT_KEYS.includes(k) ? briefWear(val(k)) : val(k));
        return [type, ...v.slice(0, BODY_AT), look, ...v.slice(BODY_AT), ...absentTags(val, none)];
    };

    const HAIR_TAG = /\b(?:hair|bangs|twintails|twin tails|ponytail|braids?|braided|hair bun|double bun|sidelocks|ahoge|bob cut|hime cut|drill hair|pigtails|updo|ringlets|afro|mohawk|undercut|bald|hairclip|hairband)\b/i;
    const NOT_HAIR = /\b(?:facial hair|body hair|pubic hair|chest hair|arm hair)\b/i;

    const BANGS_TAG = /\bbangs\b|\bhair between eyes\b|\bhair over (?:one|both) eyes?\b|\bparted bangs\b/i;
    const HAIRCOLOR_TAG = /\b(?:black|brown|blonde?|red|blue|green|pink|purple|white|silver|gr[ae]y|orange|aqua|multicolored|gradient|streaked|two-tone|platinum blonde|ginger|inner)\s+hair$/i;
    const EYES_TAG = /(?:^|\s)eyes$|\bheterochromia\b|\bpupils$/i;
    const HEIGHT_TAG = /^(?:very )?(?:tall|short)(?: (?:female|male|girl|boy|stature))?$|^petite$|^giant(?:ess)?$|^\d+\s?cm$/i;
    const BODY_TAG = /breasts?$|\bflat chest\b|^(?:slim|slender|curvy|muscular|plump|skinny|chubby|toned|fit|thick thighs|wide hips|narrow waist|abs|large pectorals)$/i;
    const BOTTOM_TAG = /\b(?:skirt|miniskirt|pants|shorts|jeans|trousers|leggings|hakama|bloomers|culottes|slacks|sweatpants|buruma|socks|kneehighs|thighhighs|pantyhose|stockings|legwear)\b/i;
    const OLD_WEAR = ['hat', 'hair', 'outfit', 'legs'];
    const isOldWear = w => OLD_WEAR.some(k => k in w) && !WEAR_KEYS.some(k => k !== 'shoes' && k in w);
    const tagsOf = t => String(t ?? '').split(',').map(tidy).filter(Boolean);

    function fromOldWear(w, look, now) {
        const out = {};
        const put = (k, t) => { if (t.length) out[k] = joinTags(out[k] ?? '', t); };
        const none = v => /^none$/i.test(tidy(v));
        const style = [], bangs = [], color = [];
        if (!none(w.hat)) style.push(...tagsOf(w.hat));
        if (!none(w.hair)) for (const t of tagsOf(w.hair)) (BANGS_TAG.test(t) ? bangs : HAIRCOLOR_TAG.test(t) ? color : style).push(t);
        put('hairstyle', style); put('bangs', bangs); put('haircolor', color);
        if (none(w.outfit)) { out.top = 'none'; out.bottom = 'none'; }
        else if (tidy(w.outfit) || tidy(w.legs)) {
            const top = [], bottom = [];
            for (const t of tagsOf(w.outfit)) (BOTTOM_TAG.test(t) ? bottom : top).push(t);
            if (!none(w.legs)) bottom.push(...tagsOf(w.legs));
            put('top', top); put('bottom', bottom);

            if (now && tidy(w.outfit) && !bottom.length) out.bottom = 'none';
        }
        if (tidy(w.shoes)) out.shoes = tidy(w.shoes);
        let rest = look;
        if (look != null) {
            const eyes = [], height = [], body = [], other = [];
            for (const t of tagsOf(look)) (EYES_TAG.test(t) ? eyes : HEIGHT_TAG.test(t) ? height : BODY_TAG.test(t) ? body : other).push(t);
            put('eyes', eyes); put('height', height); put('body', body);
            rest = other.join(', ');
        }
        return { wear: out, look: rest };
    }

    function normCast(e) {
        let old = null;
        if (e.wear && typeof e.wear === 'object') {
            if (!isOldWear(e.wear)) {
                e.wear = { ...emptyWear(), ...Object.fromEntries(WEAR_KEYS.map(k => [k, e.wear[k] ?? ''])) };
                return e;
            }
            old = e.wear;
        } else {
            const look = [], hair = [];
            for (const t of tagsOf(e.look)) (HAIR_TAG.test(t) && !NOT_HAIR.test(t) ? hair : look).push(t);
            old = { outfit: tidy(e.outfit), hair: hair.join(', ') };
            e.look = look.join(', ');
        }
        const r = fromOldWear(old, e.look ?? '', false);
        e.wear = { ...emptyWear(), ...r.wear };
        e.look = r.look;
        delete e.outfit;
        return e;
    }

    function readState(chat) {
        try {
            const v = JSON.parse(chat?.scriptstate?.['$nc_state'] ?? '');
            if (v && typeof v === 'object') {
                const wear = {};
                for (const [id, w] of Object.entries(v.wear ?? {})) if (w && typeof w === 'object') wear[id] = { ...w };

                const old = v.outfits && typeof v.outfits === 'object' ? v.outfits : {};
                for (const [id, o] of Object.entries(old)) if (tidy(o)) (wear[id] ??= {}).outfit ??= tidy(o);

                for (const [id, w] of Object.entries(wear)) if (isOldWear(w)) wear[id] = fromOldWear(w, null, true).wear;
                const seeded = v.seeded === true || Object.keys(old).length > 0;
                const out = { location: '', time: '', ...v, wear, seeded };
                delete out.outfits;
                return out;
            }
        } catch {}
        return { location: '', time: '', wear: {}, seeded: false };
    }
    const baseWear = (e, k) => tidy(e?.wear?.[k]);

    function wearOf(e, state, k) {
        const now = tidy(state?.wear?.[e?.id]?.[k]);
        if (now) return isNone(now) ? '' : now;
        return baseWear(e, k);
    }
    const noneOf = (e, state, k) => isNone(state?.wear?.[e?.id]?.[k]);
    function writeStateInto(chat, state, cast) {
        chat.scriptstate ??= {};
        const ss = chat.scriptstate;
        ss['$nc_state'] = JSON.stringify({ ...state, at: Date.now() });
        if (!st.set.vars) return;
        ss['$nc_location'] = state.location ?? '';
        ss['$nc_time'] = state.time ?? '';
        for (const e of cast?.list ?? []) {
            const n = varName(e.name);
            ss[`$nc_${n}_look`] = e.look ?? '';
            for (const k of WEAR_KEYS) ss[`$nc_${n}_${k}`] = wearOf(e, state, k);

            ss[`$nc_${n}_outfit`] = joinTags(wearOf(e, state, 'top'), wearOf(e, state, 'bottom'));
            ss[`$nc_${n}_hair`] = joinTags(['hairstyle', 'bangs', 'haircolor'].map(k => wearOf(e, state, k)));
        }
    }

    const msgKeyOf = (m, i, list) => {
        const id = m?.chatId;
        if (!id) return '#' + i;
        return list?.some((x, j) => j !== i && x?.chatId === id) ? `${id}@${i}` : id;
    };
    function findMsg(chat, key, idx) {
        const list = chat?.message ?? [];
        if (key && !key.startsWith('#')) {
            const at = key.lastIndexOf('@');
            const id = at > 0 ? key.slice(0, at) : key;
            const near = at > 0 ? Number(key.slice(at + 1)) : idx;
            let best = -1;
            list.forEach((m, i) => {
                if (m?.chatId === id && (best < 0 || Math.abs(i - near) < Math.abs(best - near))) best = i;
            });
            if (best >= 0) return best;
        }
        if (key?.startsWith('#')) idx = Number(key.slice(1));
        return Number.isInteger(idx) && idx >= 0 && idx < list.length ? idx : -1;
    }

    function recKeyIn(recs, chat, key, i) {
        if (recs?.[key]) return key;
        const id = chat?.message?.[i]?.chatId;
        return id && id !== key && recs?.[id] && findMsg(chat, id, recs[id].idx) === i ? id : '';
    }
    const chatKeyOf = (chat, chi) => chat?.id || '#' + chi;
    const lastBotIndex = chat => {
        const list = chat?.message ?? [];
        for (let i = list.length - 1; i >= 0; i--) if (list[i]?.role === 'char') return i;
        return -1;
    };

    let keyKnown = null;
    async function naiKey() {
        const v = String(await api.getArgument('nai_api_key').catch(() => '') ?? '').trim();
        keyKnown = !!v;
        return v;
    }

    const told = new Set();
    function tellOnce(key, msg) {
        if (told.has(key)) return;
        told.add(key);
        void api.alertError?.(msg);
    }
    async function setNaiKey(v) {
        await api.setArgument('nai_api_key', String(v ?? '').trim());
        keyKnown = !!String(v ?? '').trim();
        void rootQueue(() => paintBusy(true));
        if (String(v ?? '').trim()) told.delete('nokey');
    }

    const NO_KEY_AUTO = '이매진: NAI 키가 비어 있어 새 답변을 그리지 않았습니다. 리수는 플러그인을 새 판으로 바꿀 때 플러그인 설정을 지웁니다. 🎨 이매진 패널의 준비 탭에서 키를 다시 넣어 주세요.';

    async function readStream(stream, onChunk) {
        const reader = stream.getReader();
        let last = '';
        for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            if (typeof value === 'string') last += value;
            else if (value && typeof value === 'object') last = Object.values(value).join('');
            onChunk?.(last);
        }
        return last;
    }

    function withHead(system) {
        const head = String(st.set.head ?? '').trim();
        if (!head) return system;
        return `[USER INSTRUCTIONS — read these first. They take priority over the rules below whenever they conflict, but the output must still be the JSON object described below.]\n${head}\n\n${system}`;
    }

    async function requestModel(system, user, raw = false, llm = st.busy?.llm ?? st.set.llm) {
        if (!raw) system = withHead(system);
        const res = await api.runLLMModel({
            mode: llm === 'model' ? 'model' : 'submodel',
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: user },
            ],
            allowPlugins: true,
        });
        if (!res) throw new Error('모델이 아무것도 돌려주지 않았습니다.');
        if (res.type === 'fail') throw new Error(String(res.result || '모델 요청이 실패했습니다.'));
        if (res.type === 'streaming') return readStream(res.result);
        return res.type === 'multiline' ? res.result.map(x => x[1]).join('\n') : String(res.result ?? '');
    }

    async function askModel(system, user) {
        const busy = st.busy;
        if (busy?.stop) throw stopError();
        const work = requestModel(system, user);
        work.catch(() => {});
        const text = await (busy ? Promise.race([work, busy.halt]) : work);
        if (busy?.stop) throw stopError();
        return text;
    }

    function jsonObjectAt(s, a, fix) {
        let depth = 0, inStr = false, out = '';
        for (let i = a; i < s.length; i++) {
            const c = s[i];
            if (inStr) {
                if (c === '\\') { out += c + (s[i + 1] ?? ''); i++; continue; }
                if (c === '"') {
                    if (fix && !closesString(s, i + 1)) { out += '\\"'; continue; }
                    inStr = false;
                }
                out += c === '\n' ? '\\n' : c === '\r' ? '\\r' : c === '\t' ? '\\t' : c;
                continue;
            }
            if (c === '"') inStr = true;
            else if (c === '{') depth++;
            else if (c === '}' && --depth === 0) return out + c;
            out += c;
        }
        return null;
    }

    function closesString(s, i) {
        while (i < s.length && /\s/.test(s[i])) i++;
        const c = s[i];
        if (c === undefined || c === '}' || c === ']' || c === ':') return true;
        if (c !== ',') return false;
        i++;
        while (i < s.length && /\s/.test(s[i])) i++;
        return i >= s.length || /["{[\]}\-\dtfn]/.test(s[i]);
    }
    const jsonError = t => { try { JSON.parse(t); return ''; } catch (e) { return String(e?.message || e); } };
    const tryJson = t => {
        try { return JSON.parse(t); } catch {}
        try { return JSON.parse(t.replace(/,\s*([}\]])/g, '$1')); } catch { return undefined; }
    };

    const askError = (msg, hint, raw) => Object.assign(new Error(msg), { hint, raw });

    function parseJson(text, want) {
        const s = String(text).replace(/<(think|thinking|thoughts)>[\s\S]*?<\/\1>/gi, '').replace(/<details\s[^>]*data-pm-thinking[^>]*>[\s\S]*?<\/details>/gi, '');
        const parts = [...[...s.matchAll(/```[\w-]*\s*([\s\S]*?)```/g)].map(m => m[1]), s];
        let first, broken = '';
        for (const part of parts) {
            for (let a = part.indexOf('{'); a >= 0; a = part.indexOf('{', a + 1)) {
                if (!/^\{\s*["“}]/.test(part.slice(a, a + 64))) continue;
                const body = jsonObjectAt(part, a);
                let v = body ? tryJson(body) : undefined;

                if (v === undefined) { const b = jsonObjectAt(part, a, true); if (b) v = tryJson(b); }
                if (v === undefined) v = tryJson(part.slice(a, part.lastIndexOf('}') + 1));

                if (v === undefined) v = tryJson(part.slice(a, part.lastIndexOf('}') + 1).replace(/[“”]/g, '"'));
                if (v === undefined) {
                    broken ||= body ? jsonError(body) || 'invalid JSON' : 'the JSON object is not closed (it may be cut off)';
                    continue;
                }
                if (!v || typeof v !== 'object' || Array.isArray(v)) continue;
                if (want && want in v) return v;
                first ??= v;
            }
        }
        if (first) return first;
        if (broken) throw askError(`응답의 JSON 문법이 깨져 있습니다 (${broken}).`, `its JSON could not be parsed: ${broken}`);
        throw askError(noJsonMessage(s), 'it contained no JSON object');
    }

    const SNIPPET_MAX = 300;
    const ERROR_LIKE = /error|fail|exception|denied|forbidden|unauthori[sz]ed|quota|rate.?limit|overloaded|unavailable|timeout|timed out|blocked|safety|refus|invalid|\b[45]\d\d\b|오류|에러|실패|거절|차단|초과|한도/i;
    const modelErrorText = e => {
        const t = typeof e === 'string' ? e : [e?.code ?? e?.status, e?.message ?? e?.type].filter(x => x != null && x !== '').join(' ') || JSON.stringify(e);
        return t.length > SNIPPET_MAX ? t.slice(0, SNIPPET_MAX) + '…' : t;
    };
    function noJsonMessage(s) {
        const t = String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        if (!t) return '모델 응답에 생각(think) 부분만 있고 본문이 비어 있습니다.';
        const cut = t.length > SNIPPET_MAX ? t.slice(0, SNIPPET_MAX) + '…' : t;

        return t.length < 800 && ERROR_LIKE.test(t.slice(0, 200)) ?`모델이 오류를 돌려주었습니다: ${cut}` : `모델 답변: ${cut}`;
    }

    const ASK_TRIES = 3;
    const RAW_MAX = 6000;
    const retryNote = error => `\n\n[NOTE] Your previous response could not be used${error?.hint ? `: ${error.hint}` : ''}. Output a single valid JSON object only, with no explanation. Inside string values never write the double quote character ("): drop quotation marks from copied lines.`;
    async function askJson(system, user, want, check) {
        let lastError;
        const msgs = [];
        const busy = st.busy;
        const label = busy?.label;
        try {
            for (let attempt = 0; attempt < ASK_TRIES; attempt++) {
                if (attempt) {
                    if (busy) { busy.label = `${label} · 다시 시도 ${attempt + 1}/${ASK_TRIES}`; render(); }
                    await sleep(1500);
                    if (busy?.stop) throw stopError();
                }
                let text = '';
                try {
                    text = await askModel(system, attempt ? user + retryNote(lastError) : user);
                    if (!String(text).trim()) throw askError('모델이 빈 응답을 돌려주었습니다.', 'it was empty');
                    const v = parseJson(text, want);

                    if (want && !(want in v) && v.error) throw askError(`모델이 오류를 돌려주었습니다: ${modelErrorText(v.error)}`, 'it was an error object');
                    if (want && !(want in v)) throw askError(`응답 JSON에 ${want} 항목이 없습니다.`, `the JSON had no "${want}" key`);
                    const bad = check?.(v);
                    if (bad) throw askError(bad, `the "${want}" list was empty or not a list of objects`);
                    return v;
                } catch (error) {
                    if (error?.isStop || busy?.stop) throw stopError();
                    lastError = error;
                    msgs.push(String(error?.message || error));
                    if (text) lastError.raw = String(text).slice(0, RAW_MAX);
                    console.warn(LOG, `scene model try ${attempt + 1}/${ASK_TRIES}`, error, String(text).slice(0, 2000));
                }
            }

            const uniq = [...new Set(msgs)];
            if (lastError && !lastError.isStop) lastError.message = uniq.length > 1
                ? msgs.map((m, i) => `${i + 1}번째: ${m}`).join(' / ')
                : `${lastError.message} (${ASK_TRIES}번 시도)`;
            throw lastError;
        } finally {
            if (busy && label !== undefined) { busy.label = label; render(); }
        }
    }

    const TAG_STYLE = `TAG STYLE (everything that goes to NAI)
- Use real Danbooru tags as the main vocabulary: lowercase, comma separated, spaces instead of underscores (e.g. "long hair", "pleated skirt", "looking back", "hand on own chest"). Whenever an existing Danbooru tag fits, use the tag.
- When no tag captures a detail (a specific design or pattern, an unusual action, how two things relate), a short plain-English phrase or sentence is fine, e.g. "white blouse with a black ribbon at the collar", "she hides a letter behind her back". Keep each one short, about 20 words as a guide (not a hard limit), with no commas inside, and put it between the tags like another tag.
- Describe only what is visible. No negation ("no hat", "not smiling", "without glasses"): leave the thing out, or put it in uc when the output has one.
- No quotation marks around tags or phrases (speech bubble text follows its own rule).
- No long descriptions, no names, no Korean / Japanese.`;

    const COLOR_RULE = `COLOR RULE (every worn item)
- Every clothing item, headwear, hair accessory, accessory and footwear tag MUST carry its color: tops, dresses, jackets, skirts, pants, socks / stockings, shoes, hats, hair ribbons / clips / bands, necklaces, chokers, earrings, gloves, scarves, ties, belts, bags, glasses. E.g. "white sailor shirt, red neckerchief, navy pleated skirt, black thighhighs, brown loafers, red hair ribbon, black beret, gold earrings, black-framed eyewear".
- Put the color in front of the item ("navy pleated skirt"). For patterns or two-tone items name the colors ("blue and white striped shirt", "red plaid skirt").
- When the source gives no color, choose a plausible one that fits the character and the setting, and keep it from then on. Never write a worn item without a color.
- Accessories worn on the body (necklace, choker, earrings, gloves, scarf, tie, belt, bag) go in top; socks / stockings go in bottom; headwear and hair accessories go in hairstyle; glasses stay in look.
- Only items take a color. Hair length / hairstyle tags, "barefoot" and "none" have none.`;

    const castSystem = () => `You convert a roleplay bot's character sheet, lorebook and the user's persona into NovelAI (NAI Diffusion V4.5) danbooru tags, so the same character is drawn identically in every image.
Output ONE JSON object only:
{"cast":[{"name":"exact name used in the story","aliases":["other names / nicknames, the name in the source's own script (e.g. Korean) and other romanizations"],"type":"girl|boy|other","hairstyle":"...","bangs":"...","haircolor":"...","eyes":"...","height":"","body":"...","look":"","top":"...","bottom":"...","shoes":"...","persona":false}]}
Rules
- One entry per recurring character who has (or clearly implies) a visual appearance. ${castMaxNow() ? `At most ${castMaxNow()} entries, most important first.` : 'Most important first.'} Include the user's persona as an entry with "persona": true when a persona is given.
- type: girl for female, boy for male, other for non-human / ambiguous.
- Every slot follows TAG STYLE below: Danbooru tags first, a short phrase only for a design no tag covers. Colors go into the tags (e.g. "red eyes", "white sailor shirt").
- hairstyle: hair length, hairstyle, hair texture, hair accessories and default headwear, each accessory / headwear with its color (e.g. "long hair, high ponytail, straight hair, red hair ribbon, white beret"). No hair color, no bangs.
- bangs: the bangs shape (e.g. "blunt bangs", "swept bangs, hair between eyes").
- haircolor: hair color only (e.g. "black hair", "silver hair, streaked hair").
- eyes: eye color (e.g. "red eyes", "heterochromia, blue eyes, yellow eyes").
- height: one height tag when the source implies it ("tall female", "petite", "short"), "" when average.
- body: build and chest size (e.g. "slim, large breasts", "muscular", "flat chest").
- look: other permanent features only, 0-8 tags: skin, age-appearance, animal ears, horns, tail, glasses (with frame color, e.g. "black-framed eyewear"), scars, mole. "" when none. No hair, eye, body or clothing tags here.
- top: the default upper-body clothing with colors and design, plus accessories worn on the body, 2-6 tags. A dress / one-piece goes here (e.g. "white sailor shirt, red neckerchief, silver necklace").
- bottom: the default lower-body clothing with colors and design, plus socks / stockings (e.g. "navy pleated skirt, black thighhighs"). "" when the top is a dress that covers it.
- shoes: default footwear with its color (e.g. "brown loafers"), "" when unknown and not implied.
- If the source does not describe something, choose plausible tags that fit the setting; never leave hairstyle, haircolor, eyes or top empty.
- Tags in English even when the source is Korean / Japanese.

${COLOR_RULE}

${TAG_STYLE}`;

    const isIllust = () => st.set.kind === 'illust';
    const bubblesNow = () => !isIllust() && !!st.set.bubbles;
    const kindName = () => isIllust() ? '삽화' : '만화';
    const sizeNow = () => SIZES[st.set.size] ? st.set.size : 'tall';
    const countNow = () => clampInt(st.set.count, 1, 4, 1);

    const loreMaxNow = () => Math.max(0, parseInt(st.set.loreMax, 10) || 0);
    const castMaxNow = () => Math.max(0, parseInt(st.set.castMax, 10) || 0);

    const setupDone = () => !!(st.set.setup?.llm && st.set.setup?.model && st.set.setup?.kind && st.set.setup?.preset && st.set.setup?.count);
    const recipe = () => `${kindName()} ${countNow()}장 · ${preset().name || '이름 없음'}`;
    function setStep(k) { st.set = { ...st.set, setup: { ...st.set.setup, [k]: true } }; saveSet(); }

    const panelsOf = img => isIllust() ? 1 : clampInt(Array.isArray(img?.panels) ? img.panels.length : img?.panels, 2, 4, 2);

    const PANEL_RULES = {
        one: `PANELS = 1 (one moment, no panel borders)
- scene: the background and details only, in this order: "indoors" or "outdoors", then a simple place tag (e.g. "indoors, classroom"), then detail tags (lighting, time, weather, mood, background objects). Danbooru tags plus up to 3 short sentences when tags alone cannot show the moment. No character appearance, no camera / framing (it goes in chars[].tags), no count tags (the app adds 1girl / 1boy counts itself), no names.
- chars[].tags: Danbooru tags (a short phrase is fine for an action no tag covers), in this order: first expression and state (expression, blush, tears, sweat, wet, a temporary mark such as a bandage), then composition and pose (ONE view family — "portrait" or "upper body" or "cowboy shot" or "full body", do not mix — camera angle, pose, action; the gaze goes in chars[].gaze, not here). For interactions prefix tags with source#, target# or mutual# (source#hug, target#hug, mutual#holding hands). A character who speaks in this image gets "open mouth". Never "looking at viewer".
- chars[].gaze: REQUIRED for every entry, monsters too: whom or what this one is looking at in this moment, so it reads clearly. ONE gaze tag, then the target in a few English words. With 2 or more entries, someone who looks at another entry writes "looking at another" plus that entry's role (e.g. "looking at another, looking at the dragon", "looking at another, looking at the girl beside him"); add "eye contact" when both look at each other. Looking at something else: name the thing in the scene ("looking at the letter in hand", "looking down at the fallen sword", "looking out the window", "looking up at the sky"). No target: a clear direction ("looking ahead", "looking away", "looking down") or "closed eyes". Use role words only (the dragon, the girl, the old man), never names. Never "looking at viewer".
- cell: where each character sits, as a cell code on a 5x5 grid laid over the canvas. Letter A-E = column, left to right; number 1-5 = row, top to bottom; A1 is the top-left corner, C3 the center, E5 the bottom-right corner. Put the cell on the character's face / body center. With 2 characters, give them different cells that match the composition (e.g. B3 and D3 side by side, B4 and D2 for one low and one high). With 1 character write "C3": the app sends no position for a single character.`,

        comic: `COMIC PAGE (2 to 4 panels, all drawn in this one image; the app adds the manga page / panel border tags and each character's looks itself)
- scene: short tags for the background shared by the page: location, time, lighting, weather (e.g. "classroom, afternoon, sunlight through window"). No characters, no panels, no camera, no sentences.
- panels: one entry per panel, in reading order. Each panel shows ONE character by default (the app writes "solo"); put 2 characters in one panel only when they physically interact (hug, handing something over, face to face). Never more than 2.
  - who: the CAST names of the characters in this panel (1, at most 2).
  - camera: shot distance + angle tags, e.g. "medium shot, from slightly below", "close-up, from side", "cowboy shot, dutch angle", "upper body, from above", "full body, from behind". Neighbouring panels never share the same camera. With 3-4 panels, use close-ups too (face, hands, a key object).
  - tags: what the character does in this panel: pose, action, gesture, expression and gaze. A few Danbooru tags first, then short plain-English phrases that show the exact moment, comma separated, about 10-30 words. E.g. "standing pose, arms crossed confidently, arrogant smug smile, looking down, one hand brushing her hair back". A character who speaks here gets "open mouth" or a speaking expression. No hair, eye, body or clothing tags and no names: the app adds the looks from CAST.
  - Gaze: no "looking at viewer" by default. Use it only in a panel where a character faces the user's character (the [user persona] in CAST) and speaks to them directly; otherwise pick a gaze that fits the beat ("looking at another", "looking down", "looking away", "looking to the side") or none.
  - A third character may appear only as "out of frame, hand" inside a panel's tags and is not listed in who.
- Never use number words for panels (first, second, top panel...): the order of the panels array is the reading order.`,
    };

    const genreNow = () => st.set.genre !== false;
    const GENRE_TAGS = {
        action: '2::action, motion lines, motion blur::',
        romance: '1.5::romance, soft lighting, sparkle, bokeh::',
        comedy: '1.5::comedy, emphasis lines::',
        horror: '1.5::horror (theme), ominous, dark, shadow::',
        sad: '1.5::melancholy, dim lighting::',
        suspense: '1.5::suspense, dramatic lighting, shadow::',
        daily: '1::slice of life, warm lighting::',
    };
    const GENRE_RULE = `- genre: the mood of this image (for a comic page: the page as a whole), one of: action (combat, an attack, a chase, a fast dash), romance (flirting, a confession, a kiss, a tender moment), comedy (a gag, a silly reaction), horror (fear, gore, something creepy), sad (grief, tears, loneliness), suspense (tension, a mystery, a threat before it strikes), daily (calm everyday life), none (unclear or mixed). The app adds that genre's tags itself, so do not write genre or motion tags into scene or tags.`;

    const monoNow = () => st.set.dynamic !== false && [ARTIST3.id, ARTIST4.id].includes(preset()?.id);
    const dynLite = () => preset()?.id === ARTIST4.id;
    const askGenre = () => genreNow() || monoNow();

    const DYN_MIN_DEF = 9;
    const dynMinNow = () => { const n = parseInt(st.set.dynMin, 10); return Number.isFinite(n) ? Math.min(10, Math.max(1, n)) : DYN_MIN_DEF; };

    const DYNAMIC_RULE = () => `- severity: an integer 1-10 for how intense THIS image's moment is. Judge only what is visible in this image, not the mood of the whole story or the scenes before it. Pick the highest band whose description the image fully matches:
  1-2: calm. Daily life, rest, eating, walking, sleeping, quiet talk.
  3-4: feelings without danger. Banter, a joke, flirting, embarrassment, surprise, crying, an argument with words.
  5-6: tension or light physical action. A threat or a standoff before a fight, a chase, sparring or training, a slap or a shove, a fall, a minor accident.
  7: an ordinary fight in progress. Trading blows, dodging, chasing off a weak monster, a fight one side is clearly winning.
  8: a hard fight. At least one of these is visible: an attack at full force, a big spell being cast, a strong enemy or a large monster, two weapons clashing at full strength.
  9: a life-or-death moment. At least one of these is visible: landing the final blow on a strong boss, someone caught between life and death (about to be killed, falling to their death, cornered with no way out), someone who has just taken serious damage (badly wounded, bleeding heavily, knocked down by a crushing hit), an ultimate or finishing move, a desperate counterattack, the turning point of a battle.
  10: the climax of the whole story. The final battle, a last stand, a death, a world-changing moment.
  Hard rules: an image with no fight, attack, spell, monster or mortal danger in it is 6 or lower, however emotional it is (a confession, a farewell, a shocking reveal). When torn between two numbers, pick the lower one. Do not inflate. The app draws an image with severity ${dynMinNow()} or higher as a monochrome sketch with only the accents in color.`;
    const ACCENT_RULE = () => `- accent: only when severity is ${dynMinNow()} or higher, a list with ONE entry per fighter in the image (every character and every monster), written as "Name: color + effect" with the name exactly as in ${isIllust() ? 'chars[].name' : 'panels[].who'}. Each fighter gets their OWN effect, decided for that fighter by this fixed rule, in order:
  1. that fighter has a sword or any weapon (held, drawn, sheathed or swung; it does not have to be swung): its trail (e.g. "yellow sword trail", "blue slash trail", "red spear trail").
  2. else that fighter uses or carries magic (a spell, a charging hand, an aura; it does not have to be cast): its effect (e.g. "red magic effects", "purple magic circle", "blue lightning").
  3. else that fighter fights bare-handed (a fighting stance, fists, a punch or kick; it does not have to land): its trail (e.g. "blue impact trail", "orange shockwave").
  4. else (any character or monster, even standing still): its movement trail, the path of its body's motion (e.g. "red motion trail", "green speed lines", "purple afterimage trail").
  A fighter with a weapon ALWAYS gets rule 1 (a weapon trail), even when they also use magic or fists. When 2 and 3 both apply, use their main action. Every fighter uses a DIFFERENT color from the others. The color must be a real hue (red, orange, yellow, green, blue, purple, pink, gold, ...), never white, black, grey or silver: those do not stand out in a monochrome image. Never use eyes, blood, fire or other objects. Example: ["Aria: yellow sword trail", "Kain: purple magic effects", "Goblin: green motion trail"]. The app draws a dynamic image as a monochrome sketch with only these in color. Keep writing every other color as usual everywhere (scene, tags, state.cast); the app removes them itself. Empty list when severity is below ${dynMinNow()}.`;
    const panelRules = () => [isIllust() ? PANEL_RULES.one : PANEL_RULES.comic, askGenre() ? GENRE_RULE : '', monoNow() ? DYNAMIC_RULE() : '', monoNow() ? ACCENT_RULE() : ''].filter(Boolean).join('\n');

    const GENRE_ALIAS = { battle: 'action', combat: 'action', fight: 'action', fighting: 'action', chase: 'action', romantic: 'romance', love: 'romance', comic: 'comedy', funny: 'comedy', gag: 'comedy', scary: 'horror', creepy: 'horror', sadness: 'sad', melancholy: 'sad', tragic: 'sad', tense: 'suspense', tension: 'suspense', mystery: 'suspense', thriller: 'suspense', everyday: 'daily', 'slice of life': 'daily', calm: 'daily' };
    function genreKey(v) {
        const t = tidy(v).toLowerCase();
        if (!t || t === 'none') return '';
        if (GENRE_TAGS[t]) return t;
        const words = t.split(/[^a-z ]+/).map(tidy).filter(Boolean);
        for (const w of words) {
            if (GENRE_TAGS[w]) return w;
            if (GENRE_ALIAS[w]) return GENRE_ALIAS[w];
            for (const x of w.split(' ')) if (GENRE_TAGS[x] || GENRE_ALIAS[x]) return GENRE_TAGS[x] ? x : GENRE_ALIAS[x];
        }
        return '';
    }
    const genreTags = img => genreNow() ? GENRE_TAGS[genreKey(img?.genre)] ?? '' : '';

    const USER_LINE_RULE = {
        illust: '- Exception: in image 1 (the moment USER ACTION describes) a line spoken in USER ACTION may be copied VERBATIM from USER ACTION; its by is the CAST name of whoever speaks it there (the [user persona] name when it is the user).',
        comic: '- Exception: in panel 1 of image 1 (the moment USER ACTION describes) a line spoken in USER ACTION may be copied VERBATIM from USER ACTION; its by is the CAST name of whoever speaks it there (the [user persona] name when it is the user), who must be in that panel\'s who.',
    };

    function bubbleRules(maxB, withInput = false) {
        if (!isIllust()) return panelTextRules(withInput);
        if (!bubblesNow()) return 'SPEECH BUBBLES: off. "bubbles" must be []. Do not mention text, letters, speech bubbles or captions anywhere.';
        return `SPEECH BUBBLES: on. For each image add up to ${maxB} bubbles with the most important spoken lines of that moment.
- text: copy the line VERBATIM from the TARGET MESSAGE, in its original language and script, with the same words and punctuation. Never translate, paraphrase, merge or invent lines. Leave out only the quotation marks around it.${withInput ? '\n' + USER_LINE_RULE.illust : ''}
- ONE sentence per bubble at most. When a line has several sentences, copy just one complete sentence of it exactly (cut only at the speaker's own punctuation: . ! ? … ~) or choose another line. Never put a second sentence in the same bubble.
- by: the speaker's exact CAST name, or "narration" for a caption box (at most 1 narration per image). A narration caption is also copied verbatim from the narration text of the TARGET MESSAGE.
- List bubbles in reading order. Bubbles have no x / y.`;
    }

    function panelTextRules(withInput = false) {
        if (!bubblesNow()) return 'SPEECH BUBBLES: off. Every panels[].text and panels[].by must be "". Do not mention text, letters, speech bubbles or captions anywhere.';
        return `SPEECH BUBBLES: on. A panel may carry ONE spoken line in text; the app draws it as that panel's speech bubble.
- text: copy the line VERBATIM from the TARGET MESSAGE, in its original language and script, with the same words and punctuation. Never translate, paraphrase, merge or invent lines. Leave out only the quotation marks around it.${withInput ? '\n' + USER_LINE_RULE.comic : ''}
- ONE sentence per panel at most. When a line has several sentences, copy just one complete sentence of it exactly (cut only at the speaker's own punctuation: . ! ? … ~) or choose another line.
- by: the speaker's exact CAST name. The speaker must be in that panel's who. Spoken lines only: no narration captions.
- Give lines to the panels where the most important lines of the moment are spoken; leave text and by "" for a panel without a line.`;
    }

    function userInputOf(chat, idx) {
        const m = chat?.message?.[idx - 1];
        return m?.role === 'user' && tidy(plainText(m.data)) ? m : null;
    }

    function comicSystem(withInput = false, plainInput = false) {
        const n = countNow();
        const size = sizeNow();
        const [w, h] = SIZES[size];
        const shape = w > h ? 'landscape' : w < h ? 'portrait' : 'square';
        const role = withInput
            ? (isIllust()
                ? 'You are an illustration director. You turn what the user just wrote in a roleplay (USER ACTION: their own character\'s action or line, or what they direct or narrate other characters doing) and how the reply answers it (TARGET MESSAGE) into NovelAI prompts for standalone illustrations: one moment per image, no panels, no speech bubbles, no text.'
                : 'You are a comic director. You turn what the user just wrote in a roleplay (USER ACTION: their own character\'s action or line, or what they direct or narrate other characters doing) and how the reply answers it (TARGET MESSAGE) into NovelAI image prompts.')
            : isIllust()
            ? 'You are an illustration director. You turn the TARGET MESSAGE of a roleplay into NovelAI prompts for standalone illustrations: one moment per image, no panels, no speech bubbles, no text.'
            : 'You are a comic director. You turn the TARGET MESSAGE of a roleplay into NovelAI image prompts.';
        const pick = !withInput
            ? `- Output exactly ${n} image${n > 1 ? 's' : ''}: the ${n === 1 ? 'single most important key moment' : `${n} most important key moments`} of the TARGET MESSAGE${n > 1 ? ', in story order, each a different moment (fewer only when the message truly has fewer distinct moments)' : ''}.`
            : n > 1
            ? `- Output exactly ${n} images, in story order, each a different moment. Image 1 is the moment what USER ACTION describes happens or lands, whoever does it: pick the part of the TARGET MESSAGE that narrates or answers it. The other images are mainly the reactions to it. Do not pick parts of the reply that have nothing to do with USER ACTION.`
            : isIllust()
            ? '- Output exactly 1 image: the moment what USER ACTION describes happens or lands, whoever does it, as the TARGET MESSAGE narrates or answers it.'
            : '- Output exactly 1 image. Inside it, panel 1 is the moment what USER ACTION describes happens or lands, whoever does it, and the next panels are the reaction to it from the TARGET MESSAGE.';
        const userRules = withInput ? `
- focus: before choosing images, restate in one English sentence who does what in USER ACTION. Image 1 draws exactly that.
- USER ACTION is not always the user's own character acting. It may also direct or narrate what other characters do (e.g. "A hugs B", "B starts crying"). Read who the actor is from USER ACTION itself.
- If the TARGET MESSAGE never narrates what USER ACTION describes, put image 1 under the first paragraph: its after is the end of the first sentence. after is always copied from the TARGET MESSAGE, never from USER ACTION.
- When USER ACTION and the TARGET MESSAGE disagree, follow the TARGET MESSAGE (e.g. the user tried to open the door but the reply says it is locked: draw the user at the locked door).
- When USER ACTION is the user's own character acting or speaking, draw them as the CAST entry marked [user persona]; if CAST has none, show it through the other character's reaction or as "out of frame, hand". When USER ACTION directs or narrates other characters, draw those characters doing it; the user persona does not need to appear.` : '';
        const panelChoice = isIllust()
            ? '- panels: always 1.'
            : `- panels: 2 to 4 entries, chosen per image. 2 for setup → reaction (good for dialogue), 3-4 only when the moment really has that many quick beats.${shape === 'portrait' ? '' : ` The canvas is ${shape}, so prefer 2 and avoid 3-4.`}`;
        const imageSchema = isIllust()
            ? '{"title":"...","after":"...","panels":1,"scene":"...","chars":[{"name":"...","type":"","tags":"...","gaze":"...","uc":"","cell":"C3"}],"bubbles":[{"by":"...","text":"..."}],"uc":""}'
            : '{"title":"...","after":"...","scene":"...","panels":[{"who":["..."],"camera":"...","tags":"...","text":"...","by":"..."}],"uc":""}';
        const imageOut = imageSchema.replace('"uc":""}', `${askGenre() ? '"genre":"none",' : ''}${monoNow() ? '"severity":1,"accent":[],' : ''}"uc":""}`);
        const promptFields = isIllust() ? 'scene, chars[].tags, chars[].gaze' : 'scene, panels[].camera, panels[].tags';
        const lineFields = isIllust() ? 'bubbles[].text' : 'panels[].text';
        const nameFields = isIllust() ? 'chars[].name and bubbles[].by use' : 'panels[].who and panels[].by use';
        return `${role}
Output ONE JSON object only, no prose:
{${withInput ? '"focus":"...",' : ''}"state":{"location":"...","time":"...","cast":[{"name":"...","hairstyle":"...","bangs":"...","haircolor":"...","eyes":"...","height":"...","body":"...","top":"...","bottom":"...","shoes":"...","type":"girl|boy|other","look":"..."}]},
 "images":[${imageOut}]}

CANVAS: ${shape}, ${w}x${h}. Every image uses this canvas; frame each moment for it.

IMAGES
${pick}
- after: copy 8-30 characters VERBATIM from the TARGET MESSAGE: the end of the sentence where this moment happens. The app puts the image right below that paragraph. Same language and punctuation as the message; never translate or paraphrase. Leave out quotation marks: never put a " character inside this value.${userRules}
${panelChoice}
${isIllust() ? '- At most 2 characters fully in frame; a third may appear only as "out of frame, hand" inside scene and is NOT listed in chars.\n- A monster or creature that is a main subject of the moment (dragon, slime, golem, beast, a summoned or holographic monster) is listed in chars too, as one more entry with "type":"monster" (at most 1 monster). Its name is a short English name (e.g. "dragon"), its tags start with the creature tag and describe its looks, size and action (e.g. "dragon, giant, holographic, breathing fire, wings spread"), and its cell is where it is. Do not describe it in scene then, and never list it in state.cast.\n- DIRECTION: when two entries interact (talking, kissing, hugging, handing something over, holding hands, arguing, fighting, a spell or beam aimed at the other, ...), the direction must read clearly. Use the ACTUAL action of this moment, never a different one: never add attacking or fighting tags to a scene that is not a fight. One-way action: the actor gets source#<action>, the other gets target#<action> (e.g. "source#talking" / "target#talking", "source#headpat" / "target#headpat", "source#punching" / "target#punching"). Both do it together: both get mutual#<action> (e.g. "mutual#kiss", "mutual#hug", "mutual#holding hands"). Give both "facing another" in tags and "looking at another, looking at the <role of the other>" in gaze when they face each other (skip "facing another" for a hug from behind or similar). Put their cells on opposite sides so they face each other across the canvas (e.g. B3 and D3; B4 and D2 for a big monster behind), and when one aims something at the other, write it toward the other one (e.g. "reaching toward the dragon", "beam toward the dragon").' : '- At most 2 characters in one panel; different panels may show different characters.'}

${panelRules()}

${bubbleRules(4, withInput)}

STATE
- state.cast is the update of the tracked character variables (the NOW slots in CAST), not a fresh description of the scene. Start from each character's NOW slots and carry them forward; list every character visible in this scene, as danbooru tags with colors, in nine slots:
  hairstyle (length, hairstyle, hair accessories, headwear), bangs, haircolor, eyes (eye color), height, body (build, chest size), top (upper-body clothing; a dress goes here), bottom (lower-body clothing incl. socks / stockings), shoes (footwear).
- Update a slot when the story changes it (undressing, getting wet, changing clothes, tying up / letting down hair, putting on / taking off a hat, accessories or shoes); otherwise copy that slot from CAST unchanged. bangs, haircolor, eyes, height and body almost never change. Write "none" for a slot that is empty now although CAST has something there (e.g. took the shoes off). Barefoot is shoes: "barefoot".
- Colors follow the COLOR RULE: every item in top, bottom, shoes and the headwear / hair accessories in hairstyle has a color. A new item the story mentions without a color gets a plausible one. When a slot you carry over from CAST has an item without a color, add one; keep the colors already there unchanged.
- For a character who is not in CAST also give "type" and "look" (other permanent features: skin, animal ears, horns, glasses, scars; may be "").
- location / time: short English tags (e.g. "classroom", "night").
- CHAT HISTORY (only sent the first time this chat is drawn): earlier messages, oldest → newest, for context only. Never draw them. Read them to find the current location / time and what each character wears now (the latest change wins), because CURRENT STATE may still be empty.
- PREVIOUS MESSAGE (sent on later draws instead of CHAT HISTORY): the reply just before the TARGET MESSAGE, for context only (who is where, what just happened). Never draw it, and copy after and every spoken line only from the TARGET MESSAGE, never from the PREVIOUS MESSAGE.${plainInput ? `
- USER INPUT: what the user wrote just before the TARGET MESSAGE; the TARGET MESSAGE is the reply to it. Context only: use it to understand what the reply answers (who acts, what was said or done), but draw the moments the TARGET MESSAGE narrates, and never copy after or spoken lines from USER INPUT.` : ''}${withInput ? `
- USER ACTION: what the user just wrote: their own character's action or line, or what they direct other characters to do; the TARGET MESSAGE is the reply to it. Unlike CHAT HISTORY and PREVIOUS MESSAGE it is not just context: image 1 draws it.` : ''}

GENERAL
- LANGUAGE: everything that becomes an image prompt (${promptFields}, uc, state.location, state.time, state.cast slots / look) is English, even when the chat is Korean or Japanese. Only ${lineFields} and after stay in the chat's own language.
- ${nameFields} names exactly as written in CAST.
- uc (optional): extra negative tags only for this image / character.
- title: a short Korean caption of the image (max 20 characters).
- Never write "solo" or count tags (1girl, 2girls...) — the app adds them.

${COLOR_RULE}

${TAG_STYLE}`;
    }

    const HISTORY_MSG = 2000;
    const HISTORY_MAX = 40000;

    const PREV_MSG = 4000;

    function castLine(e, state) {
        const alias = e.aliases?.length ? ` (aliases: ${e.aliases.join(', ')})` : '';
        const now = WEAR_KEYS.map(k => `${k}: ${wearOf(e, state, k) || 'none'}`).join(' | ');
        return `- ${e.name}${alias}${e.persona ? ' [user persona]' : ''} | type: ${e.type} | look: ${e.look || '?'} | NOW ${now}`;
    }

    function comicUser(char, chat, idx, cast, state, personaName, input = null, emphasize = false) {
        const msgs = chat.message ?? [];
        const userName = personaName || 'User';
        const botName = char.name || 'Bot';
        const label = m => m.role === 'user' ? `[${userName}]` : `[${m.name || botName}]`;
        const lines = [
            '# CAST',
            cast.list.filter(e => e.on !== false).map(e => castLine(e, state)).join('\n') || '(empty — invent consistent looks and report them in state.cast)',
            '',
            '# CURRENT STATE',
            `location: ${state.location || '?'} / time: ${state.time || '?'}`,
            '',
        ];

        if (!state.seeded) {
            const past = [];
            let total = 0;

            for (let i = idx - (input ? 2 : 1); i >= 0 && total < HISTORY_MAX; i--) {
                const t = plainText(msgs[i]?.data, HISTORY_MSG);
                if (!t) continue;
                const line = `${label(msgs[i])}: ${t}`;
                past.push(line);
                total += line.length;
            }
            if (past.length) lines.push(`# CHAT HISTORY (oldest → newest, ${past.length} earlier message${past.length > 1 ? 's' : ''}; context only, do not draw)`, past.reverse().join('\n\n'), '');
        } else {

            for (let i = idx - 1; i >= 0; i--) {
                if (msgs[i]?.role !== 'char') continue;
                const t = plainText(msgs[i].data, PREV_MSG);
                if (t) lines.push('# PREVIOUS MESSAGE (the reply before the target; context only, do not draw)', `${label(msgs[i])}: ${t}`, '');
                break;
            }
        }

        if (input && emphasize) {
            lines.push(`# USER ACTION (what ${userName} just wrote: their own action or line, or what they direct other characters to do; the reply below answers it; image 1 draws this)`, `${label(input)}: ${plainText(input.data)}`, '');
            lines.push('# TARGET MESSAGE (the reply to the action above; copy after and spoken lines from here)', `${label(msgs[idx])}: ${plainText(msgs[idx]?.data, 8000)}`);
        } else {
            if (input) lines.push(`# USER INPUT (what ${userName} wrote just before the target; context only, do not copy after or spoken lines from it)`, `${label(input)}: ${plainText(input.data)}`, '');
            lines.push('# TARGET MESSAGE (draw this)', `${label(msgs[idx])}: ${plainText(msgs[idx]?.data, 8000)}`);
        }
        if (tidy(st.set.extra)) lines.push('', '# EXTRA INSTRUCTIONS FROM THE USER', st.set.extra.trim());
        return lines.join('\n');
    }

    async function loadPersona() {
        try {
            const db = await api.getDatabase(['personas', 'selectedPersona']);
            const p = db?.personas?.[db.selectedPersona ?? 0];
            st.persona = p ? { name: String(p.name ?? ''), prompt: String(p.personaPrompt ?? '') } : null;
        } catch (error) {
            console.warn(LOG, 'persona', error);
            st.persona = null;
        }
        return st.persona;
    }

    async function botContext(char) {
        const persona = await loadPersona();
        let entries = [];
        try { entries = await api.getCurrentLorebookEntries() ?? []; } catch (error) { console.warn(LOG, 'lorebook', error); }
        const fill = s => String(s ?? '').replace(/\{\{char\}\}/gi, char.name || 'char').replace(/\{\{user\}\}/gi, persona?.name || 'user');
        let lore = '';
        for (const e of entries) {
            if (String(e?.comment ?? '').startsWith('이매진 · ')) continue;
            const content = fill(e?.content).trim();
            if (!content) continue;
            const keys = [e.key, e.secondkey].filter(Boolean).join(', ');
            lore += `\n### ${fill(e.comment) || keys || 'entry'}${keys ? ` (keys: ${keys})` : ''}\n${content}\n`;
            if (loreMaxNow() && lore.length > loreMaxNow()) { lore = lore.slice(0, loreMaxNow()) + '\n…(truncated)'; break; }
        }
        const parts = [
            `# BOT: ${char.name || ''}`,
            '## Description', plainText(fill(char.desc), 12000) || '(none)',
        ];
        if (tidy(char.personality)) parts.push('## Personality', plainText(fill(char.personality), 3000));
        if (tidy(char.scenario)) parts.push('## Scenario', plainText(fill(char.scenario), 3000));
        parts.push('## Lorebook', lore.trim() || '(none)');
        if (persona) parts.push(`# USER PERSONA: ${persona.name}`, plainText(fill(persona.prompt), 4000) || '(no description)');
        return { text: parts.join('\n\n'), persona };
    }
    async function readLore(char) {
        const { text, persona } = await botContext(char);
        const res = await askJson(castSystem(), text, 'cast');
        const list = [];
        for (const raw of Array.isArray(res.cast) ? res.cast : []) {
            const name = tidy(raw?.name);
            if (!name || list.some(e => e.name === name)) continue;
            list.push(castEntry(raw, name, persona));
        }
        return castMaxNow() ? list.slice(0, castMaxNow()) : list;
    }
    function castEntry(raw, name, persona) {
        const isPersona = raw.persona === true || !!(persona && name === persona.name);
        return normCast({
            id: uid(),
            name,
            aliases: (Array.isArray(raw.aliases) ? raw.aliases : []).map(tidy).filter(Boolean).slice(0, 6),
            type: ['girl', 'boy', 'other'].includes(raw.type) ? raw.type : 'girl',
            look: tidy(raw.look),
            wear: Object.fromEntries(WEAR_KEYS.map(k => [k, tidy(raw[k])])),
            persona: isPersona,
            src: isPersona ? 'persona' : 'lore',
            on: true,
        });
    }

    async function lookupCast(char, names) {
        const { text, persona } = await botContext(char);
        const ask = `${text}

# ONLY THESE CHARACTERS
${names.map(n => `- ${n}`).join('\n')}
Return entries only for the characters in this list that the character sheet, lorebook or persona describes. The source may write the same person in another script or romanization (e.g. Korean). Copy "name" exactly as written in this list. Leave out a name the source does not describe, and leave out everyone else.`;
        const res = await askJson(castSystem(), ask, 'cast');
        const out = new Map();
        for (const raw of Array.isArray(res.cast) ? res.cast : []) {
            const want = names.find(n => nameKey(n) === nameKey(raw?.name));
            if (!want || out.has(want)) continue;
            if (![raw.look, raw.eyes, raw.haircolor, raw.hairstyle].some(tidy)) continue;
            out.set(want, castEntry(raw, want, persona));
        }
        return out;
    }

    async function resolveUnknown(char, plan, cast, state) {
        state.looked ??= [];
        const names = [];
        for (const raw of Array.isArray(plan?.state?.cast) ? plan.state.cast : []) {
            const name = tidy(raw?.name);
            if (!name || name.toLowerCase() === 'narration' || tidy(raw?.type).toLowerCase() === 'monster') continue;
            const e = findCast(cast, name);
            if (e && e.src !== 'chat') continue;
            const key = nameKey(e?.name ?? name);
            if (state.looked.includes(key) || names.some(n => nameKey(n) === key)) continue;
            names.push(e?.name ?? name);
        }
        const done = new Set();
        if (!names.length) return done;
        let found = new Map();
        try {
            found = await lookupCast(char, names);
        } catch (error) {
            if (error.isStop) throw error;
            console.warn(LOG, 'lookup', error);
        }
        for (const n of names) state.looked.push(nameKey(n));
        for (const [name, fresh] of found) {
            const old = findCast(cast, name);
            if (old && old.src === 'chat') {
                Object.assign(old, { ...fresh, id: old.id, on: old.on });
                delete state.wear[old.id];
            } else if (!old) cast.list.push(fresh);
            else continue;
            done.add(name.toLowerCase());
        }
        if (found.size) console.log(LOG, 'lookup', [...found.keys()].join(', '));
        return done;
    }

    function mergeCast(cast, fresh) {
        const byName = new Map(cast.list.map(e => [e.name.toLowerCase(), e]));
        const out = [];
        for (const e of fresh) {
            const old = byName.get(e.name.toLowerCase());
            if (old) {
                byName.delete(e.name.toLowerCase());
                out.push(old.src === 'edit' ? old : { ...e, id: old.id, on: old.on });
            } else out.push(e);
        }

        const freshKeys = new Set(fresh.flatMap(e => [e.name, ...(e.aliases ?? [])].map(nameKey)));
        const same = e => [e.name, ...(e.aliases ?? [])].some(n => freshKeys.has(nameKey(n)));
        for (const old of byName.values()) if (old.src === 'edit' || (old.src === 'chat' && !same(old))) out.push(old);
        cast.list = out;
        cast.at = Date.now();
        cast.tried = true;
    }

    function findCast(cast, name) {
        const n = tidy(name).toLowerCase();
        if (!n) return null;
        return cast.list.find(e => e.name.toLowerCase() === n)
            ?? cast.list.find(e => e.aliases?.some(a => a.toLowerCase() === n))
            ?? cast.list.find(e => n.includes(e.name.toLowerCase()) || e.name.toLowerCase().includes(n))
            ?? cast.list.find(e => [e.name, ...(e.aliases ?? [])].some(a => nameKey(a) === nameKey(n)))
            ?? null;
    }

    const nameKey = s => String(s ?? '').toLowerCase().replace(/[^a-z0-9\uac00-\ud7a3]/g, '').replace(/yeo/g, 'yu').replace(/eo/g, 'u').replace(/oo/g, 'u');

    function applyState(plan, cast, state, fresh = new Set()) {
        let castChanged = false;
        const s = plan?.state ?? {};
        state.seeded = true;
        state.wear ??= {};
        if (tidy(s.location)) state.location = tidy(s.location);
        if (tidy(s.time)) state.time = tidy(s.time);
        for (const raw of Array.isArray(s.cast) ? s.cast : []) {
            const name = tidy(raw?.name);
            if (!name || name.toLowerCase() === 'narration') continue;

            if (tidy(raw?.type).toLowerCase() === 'monster') continue;
            if (fresh.has(name.toLowerCase())) continue;
            let e = findCast(cast, name);
            if (!e) {

                if (![raw.look, raw.eyes, raw.haircolor, raw.hairstyle].some(tidy)) continue;
                e = normCast({
                    id: uid(), name, aliases: [],
                    type: ['girl', 'boy', 'other'].includes(raw.type) ? raw.type : 'girl',
                    look: tidy(raw.look), wear: Object.fromEntries(WEAR_KEYS.map(k => [k, /^none$/i.test(tidy(raw[k])) ? '' : tidy(raw[k])])),
                    src: 'chat', on: true,
                });
                cast.list.push(e);
                castChanged = true;
                continue;
            }
            for (const k of WEAR_KEYS) {
                const v = tidy(raw[k]);
                if (!v) continue;
                const base = baseWear(e, k);
                const w = state.wear[e.id] ??= {};
                if (v.toLowerCase() === base.toLowerCase() || (/^none$/i.test(v) && !base)) delete w[k];
                else w[k] = v;
                if (!Object.keys(w).length) delete state.wear[e.id];
            }
        }
        return castChanged;
    }

    function countTags(types) {
        const n = { girl: 0, boy: 0, other: 0 };
        for (const t of types) n[t] = (n[t] ?? 0) + 1;
        const out = [];
        if (n.girl) out.push(n.girl === 1 ? '1girl' : `${n.girl}girls`);
        if (n.boy) out.push(n.boy === 1 ? '1boy' : `${n.boy}boys`);
        if (n.other) out.push(n.other === 1 ? '1other' : `${n.other}others`);
        return out.length ? out.join(', ') : 'no humans';
    }

    function guardTags(types) {
        const n = { girl: 0, boy: 0, other: 0 };
        for (const t of types) n[t] = (n[t] ?? 0) + 1;
        const out = [];
        for (const [t, plural] of [['girl', 'girls'], ['boy', 'boys']]) if (n[t]) out.push(`${n[t] + 1}${plural}`);
        if (types.length) out.push('extra person');
        return out.join(', ');
    }
    function removeTokens(text, tokens) {
        const set = new Set(tokens);
        return String(text ?? '').split(',').filter(p => !set.has(p.trim().toLowerCase())).join(',').replace(/,\s*,/g, ',');
    }

    const tagCore = s => { const t = s.trim().toLowerCase(), m = /^-?\d*\.?\d+::\s*(.*?)\s*::$/.exec(t); return m ? m[1] : t; };

    function dropNegBias(text) {
        const parts = String(text ?? '').split(',');
        const out = [];
        let open = '';
        for (const raw of parts) {
            const lead = /^\s*/.exec(raw)[0];
            let body = raw.slice(lead.length);
            const om = /^(-?\d*\.?\d+::)\s*/.exec(body);
            const opener = om ? om[1] : '';
            if (om) body = body.slice(om[0].length);
            const cm = /\s*::\s*$/.exec(body);
            const closer = cm ? '::' : '';
            if (cm) body = body.slice(0, cm.index);
            if (NEG_BIAS_TAGS.includes(body.trim().toLowerCase())) {
                if (opener && closer) continue;
                if (opener) { open = opener; continue; }
                if (closer) {
                    if (open) open = '';
                    else if (out.length) out[out.length - 1] = out[out.length - 1].replace(/\s*$/, '::');
                    continue;
                }
                continue;
            }
            if (open) { out.push(lead + open + raw.slice(lead.length)); open = ''; }
            else out.push(raw);
        }
        return out.join(',').trim().replace(/^,\s*|,\s*$/g, '');
    }
    const dropTags = (text, tokens) => String(text ?? '').split(',').filter(s => !tokens.includes(tagCore(s))).join(',').replace(/,\s*,/g, ',');

    const GAZE_RE = /^(looking (?!back\b)|eye contact$|staring\b|gazing\b|closed eyes$|eyes closed$)/;
    const isGazeTag = s => GAZE_RE.test(tagCore(s));
    const hasGaze = text => String(text ?? '').split(',').some(isGazeTag);
    const dropGaze = text => tidy(String(text ?? '').split(',').filter(s => !/^(looking (?!back\b)|eye contact$|staring\b|gazing\b)/.test(tagCore(s))).join(',').replace(/,\s*,/g, ','));
    const dropViewer = text => tidy(String(text ?? '').replace(/\blooking at (the )?viewer\b,?/gi, '').replace(/,\s*,/g, ',').replace(/^\s*,|,\s*$/g, ''));
    const quoteText = t => String(t ?? '').replace(/["“”]/g, "'").replace(/\s+/g, ' ').trim().slice(0, 80);

    const CJK_RE = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/;
    const flatText = t => String(t ?? '').replace(/["'“”‘’「」『』]/g, '').replace(/\s+/g, '');
    function checkLang(images, text) {
        const src = flatText(text);
        for (const img of images) {
            if (CJK_RE.test(String(img.scene ?? '')) || (Array.isArray(img.chars) ? img.chars : []).some(c => CJK_RE.test(String(c?.tags ?? ''))))
                console.warn(LOG, 'prompt is not English', img.title, img.scene);
            for (const b of Array.isArray(img.bubbles) ? img.bubbles : [])
                if (tidy(b?.text) && !src.includes(flatText(b.text))) console.warn(LOG, 'bubble is not verbatim', b.text);
            for (const pn of Array.isArray(img.panels) ? img.panels : []) {
                if (CJK_RE.test(String(pn?.camera ?? '') + String(pn?.tags ?? ''))) console.warn(LOG, 'panel prompt is not English', img.title, pn?.tags);
                if (tidy(pn?.text) && !src.includes(flatText(pn.text))) console.warn(LOG, 'panel text is not verbatim', pn.text);
            }
        }
    }

    function bubbleSlot(b) {
        const narration = !b.by || /^(narration|narrator|나레이션|내레이션)$/i.test(tidy(b.by));
        const text = quoteText(b.text);
        return {
            prompt: narration
                ? `no humans, rectangular dialogue box, black dialogue box, white border, white characters, text only, "${text}"`
                : `no humans, circular speech bubble, white speech bubble, black border, black characters, "${text}"`,
            uc: '', kind: narration ? 'narration' : 'bubble',
        };
    }

    function buildComicReq(img, cast, state) {
        const p = preset();
        const [w, h] = SIZES[sizeNow()];
        const slots = [];
        for (const pn of img.panels) {
            if (!pn || typeof pn !== 'object') continue;
            if (slots.length >= 4) break;
            const who = [];
            for (const name of (Array.isArray(pn.who) ? pn.who : [pn.who]).map(tidy).filter(Boolean)) {
                const e = findCast(cast, name);
                const key = e?.id ?? name.toLowerCase();
                if (who.some(x => x.key === key)) continue;
                who.push({ key, e, name: e?.name ?? name, type: e?.type ?? 'girl' });
                if (who.length >= 2) break;
            }
            const types = who.map(x => x.type);

            const idents = who.map(({ e, type }) => e ? identTags(type, e.look, k => wearOf(e, state, k), k => noneOf(e, state, k)).slice(1) : []);
            const head = who.length === 1 ? `${types[0]}, solo` : who.length ? countTags(types) : 'no humans';

            const line = bubblesNow() ? quoteText(String(pn.text ?? '').trim().replace(/^["'“”‘’「」『』]+|["'“”‘’「」『』]+$/g, '')) : '';
            const act = joinTags(pn.camera, pn.tags), say = line ? `Text: ${line}` : '';

            const byE = tidy(pn.by) ? findCast(cast, tidy(pn.by)) : null;
            const byKey = byE?.id ?? tidy(pn.by).toLowerCase();
            const sayAt = say ? Math.max(0, who.findIndex(x => x.key === byKey)) : -1;

            const people = who.length >= 2 ? who.map((x, k) => `${[withTags(`1${x.type}`, idents[k]), k === sayAt ? say : ''].filter(Boolean).join(' with ')},`).join('\n') : '';
            slots.push({
                prompt: people ? [people, act].filter(Boolean).join('\n') : [withTags(head, idents.flat(), act), say].filter(Boolean).join(' with '),
                uc: tidy(pn.uc), x: 0.5, y: 0.5, kind: 'panel', type: types[0] ?? 'other',
                name: who.map(x => x.name).join(' · '),
            });
        }

        let neg = removeTokens(p.neg, ['4koma', '2koma', 'multiple views']);
        if (bubblesNow()) neg = removeTokens(neg, ['subtitles', 'captions']);
        return {
            base: joinTags(dropTags(p.pos, ['sound effects']), COMIC_TAGS, img.scene),
            neg: joinTags(neg, img.uc, bubblesNow() ? '' : 'speech bubble, text, english text'),
            slots, w, h, panels: clampInt(slots.length, 2, 4, 2),
            useCoords: false,
            title: tidy(img.title).slice(0, 30),
            after: tidy(img.after).slice(0, 80),
            preset: p.id,
            kind: 'comic',
        };
    }

    function buildReq(img, cast, state) {

        const mono = monoNow() && isDynamic(img);
        if (!mono) return withGenre(buildReqRaw(img, cast, state), img);
        wearBrief = true;
        try { return dynReq(img, cast, state); } finally { wearBrief = false; }
    }
    function dynReq(img, cast, state) {

        const scene = stripColors(String(img.scene ?? '').replace(/\d*\.?\d*::\s*action,\s*motion lines,\s*motion blur\s*::,?/gi, ''));

        if (dynLite()) return monoApply(withGenre(buildReqRaw({ ...img, scene }, cast, state), img), img, cast);

        const req = dropArtists(buildReqRaw({ ...img, scene }, cast, state), preset()?.pos);
        const toned = genreKey(img?.genre) === 'action' ? { ...req, base: joinTags(req.base, GENRE_TAGS.action) } : withGenre(req, img);
        return monoApply(toned, img, cast);
    }

    const artistTagsOf = pos => {
        const text = String(pos ?? '');
        const groups = text.match(/-?\d*\.?\d+::(?:(?!::)[^,])+::/g) ?? [];
        const bare = text.replace(/-?\d*\.?\d+::(?:(?!::)[\s\S])*::/g, '').split(',').map(t => t.trim()).filter(t => /^artist:/i.test(t));
        return [...groups.map(t => t.trim()), ...bare];
    };
    function dropArtists(req, pos) {
        let base = String(req.base ?? '');
        for (const t of artistTagsOf(pos)) { const at = base.indexOf(t); if (at >= 0) base = base.slice(0, at) + base.slice(at + t.length); }
        base = base.replace(/(,\s*){2,}/g, ', ').replace(/^\s*,\s*|\s*,\s*$/g, '');
        return { ...req, base };
    }
    const severityOf = img => { const n = parseInt(tidy(img?.severity), 10); return Number.isFinite(n) ? Math.min(10, Math.max(1, n)) : 0; };
    const isDynamic = img => severityOf(img) >= dynMinNow();

    const COLOR_WORD = '(?:(?:light|dark|pale|deep|bright|pastel)[ -])?(?:red|blue|green|yellow|orange|purple|violet|pink|black|white|gr[ae]y|silver|gold(?:en)?|brown|blonde?|aqua|cyan|teal|navy|beige|crimson|scarlet|maroon|magenta|lavender|platinum|ginger|multicolored|two-tone|rainbow)';
    const COLOR_RE = new RegExp(`\\b${COLOR_WORD}(?:[- ](?:and[- ])?${COLOR_WORD})*\\b-?`, 'gi');
    const BARE_RE = /^(?:hair|eyes|skin|theme|background)$/i;
    const stripColors = text => String(text ?? '').split('\n').map(line => {
        const at = line.search(/\bText:/);
        const head = at < 0 ? line : line.slice(0, at), tail = at < 0 ? '' : line.slice(at);
        const out = head.split(',').map(part => part.split(/\s+with\s+/)
            .map(a => /::/.test(a) ? a.trim() : a.replace(COLOR_RE, '').replace(/\s+/g, ' ').trim()).filter(a => a && !BARE_RE.test(a)).join(' with ')).filter(Boolean).join(', ');
        if (tail) return out ? `${out} with ${tail}` : tail;
        return out && /,\s*$/.test(head) ? `${out},` : out;
    }).join('\n');

    const MONO_TAGS = '2::monochrome, spot color, limited palette::, 2::vanishing point, Sense of space, long shot::';

    const FX_RE = /^[a-z][a-z -]*$/;
    function accentsOf(img, cast) {
        const raw = Array.isArray(img?.accent) ? img.accent : String(img?.accent ?? '').split(/[;\n]/);
        return raw.slice(0, 6).map(a => {
            const t = tidy(a), at = t.indexOf(':');
            const who = at < 0 ? '' : tidy(t.slice(0, at)), fx = tidy(at < 0 ? t : t.slice(at + 1)).toLowerCase().slice(0, 40);
            return { who: who ? (findCast(cast ?? [], who)?.name ?? who).toLowerCase() : '', fx };
        }).filter(a => FX_RE.test(a.fx));
    }

    const WEAPON_RE = /\b(great ?sword|sword|blade|katana|rapier|sabre|saber|dagger|knife|spear|lance|halberd|glaive|scythe|axe|weapon)s?\b/i;
    const HUE_RE = /\b(red|orange|yellow|green|blue|purple|pink|gold|golden|cyan|teal|violet|crimson|magenta|azure|scarlet|emerald|amber|lime|indigo)\b/;
    function weaponTrail(fx, tags) {
        if (WEAPON_RE.test(fx) || /\bslash\b/.test(fx)) return fx;

        const w = WEAPON_RE.exec(String(tags ?? '').replace(/\b(?:source|target|mutual)#[^,]*/gi, ''));
        if (!w) return fx;
        const hue = HUE_RE.exec(fx)?.[1];
        if (!hue) return fx;
        const noun = w[1].toLowerCase().replace(' ', '');
        return joinWords(hue, noun === 'weapon' ? 'slash' : noun, 'trail');
    }
    const joinWords = (...w) => w.filter(Boolean).join(' ');
    function monoApply(req, img, cast) {
        const fxs = accentsOf(img, cast);
        const loose = [];
        const slots = req.slots.map(sl => sl.kind === 'char' || sl.kind === 'panel' ? { ...sl, prompt: stripColors(sl.prompt) } : sl);
        for (const a of fxs) {
            const hits = a.who ? slots.filter(sl => (sl.kind === 'char' || sl.kind === 'panel') && String(sl.name ?? '').toLowerCase().split(' · ').includes(a.who)) : [];
            if (!hits.length) { loose.push(a.fx); continue; }
            for (const sl of hits) sl.prompt = joinTags(sl.prompt, weaponTrail(a.fx, sl.prompt));
        }
        return { ...req, base: joinTags(req.base, MONO_TAGS, loose),
            neg: removeTokens(req.neg, ['unfinished', 'blurry', 'monochrome', 'greyscale', 'sketch']), slots, useCoords: false };
    }

    const withGenre = (req, img) => { const g = genreTags(img); return g ? { ...req, base: joinTags(req.base, g) } : req; };
    function buildReqRaw(img, cast, state) {
        if (!isIllust() && Array.isArray(img.panels)) {
            const req = buildComicReq(img, cast, state);
            if (req.slots.length) return req;
        }
        const panels = panelsOf(img);
        const one = panels === 1;
        const p = preset();
        const [w, h] = SIZES[sizeNow()];
        const chars = [];
        const seen = new Set();
        let monsters = 0;
        for (const c of Array.isArray(img.chars) ? img.chars : []) {

            if (tidy(c?.type).toLowerCase() === 'monster') {
                if (monsters++ || !tidy(c.tags)) continue;
                chars.push({ c, e: null, monster: true });
                if (chars.length >= 3) break;
                continue;
            }
            const e = findCast(cast, c?.name);
            const key = e?.id ?? tidy(c?.name).toLowerCase();
            if (!key || seen.has(key)) continue;
            seen.add(key);
            chars.push({ c, e });
            if (chars.length >= 3) break;
        }

        const withGaze = (c, tags) => {
            if (!one) return tags;
            const gaze = dropViewer(c.gaze);
            if (gaze) return joinTags(dropGaze(tags), gaze);
            if (chars.length >= 2 && !hasGaze(tags)) return joinTags(tags, 'looking at another');
            return tags;
        };
        const slots = chars.map(({ c, e, monster }) => {

            if (monster) {
                const at = xyOfCell(c.cell) ?? { x: grid(c.x), y: grid(c.y) };
                return { prompt: withGaze(c, dropViewer(c.tags)), uc: tidy(c.uc), x: at.x, y: at.y, kind: 'char', type: 'monster', name: tidy(c.name) || 'monster' };
            }
            const type = e?.type ?? (['girl', 'boy', 'other'].includes(c.type) ? c.type : 'girl');

            const ident = e ? identTags(type, e.look, k => wearOf(e, state, k), k => noneOf(e, state, k))
                : identTags(type, c.look, k => isNone(c[k]) ? '' : c[k], k => isNone(c[k]));

            const tags = one ? withGaze(c, dropViewer(c.tags)) : '';

            const at = xyOfCell(c.cell) ?? { x: grid(c.x), y: grid(c.y) };
            return { prompt: joinTags(ident, tags), uc: tidy(c.uc), x: at.x, y: at.y, kind: 'char', type, name: e?.name ?? tidy(c.name) };
        });
        if (bubblesNow()) {
            const room = Math.min(4, MAX_SLOTS - slots.length);
            const bubbles = (Array.isArray(img.bubbles) ? img.bubbles : []).filter(b => tidy(b?.text)).slice(0, room);
            for (const b of bubbles) slots.push(bubbleSlot(b));
        }
        const types = slots.filter(s => s.kind === 'char').map(s => s.type);

        const base = joinTags(countTags(types), p.pos, img.scene);
        let neg = p.neg;
        if (!one) neg = removeTokens(neg, ['4koma', '2koma', 'multiple views']);
        const negParts = [neg, img.uc];
        if (one) negParts.push(guardTags(types));
        if (!bubblesNow()) negParts.push('speech bubble, text, english text');
        if (one) negParts.push('comic, multiple panels, panel borders');
        return {
            base, neg: joinTags(negParts), slots, w, h, panels,

            useCoords: one && types.length >= 2,
            title: tidy(img.title).slice(0, 30),
            after: tidy(img.after).slice(0, 80),
            preset: p.id,
            kind: isIllust() ? 'illust' : 'comic',
        };
    }

    const spaceNum = t => typeof t === 'string' ? t.replace(/(?<=[A-Za-z][^,:\n]*\d)::/g, ' ::') : t;
    function naiBody(req, seed, s = st.set) {
        req = { ...req, base: spaceNum(req.base), neg: spaceNum(req.neg), slots: (req.slots ?? []).map(sl => ({ ...sl, prompt: spaceNum(sl.prompt), uc: spaceNum(sl.uc) })) };

        const coords = coordsOn(req);
        const at = sl => coords && (sl.kind ?? 'char') === 'char' ? { x: sl.x ?? 0.5, y: sl.y ?? 0.5 } : { x: 0.5, y: 0.5 };
        const slots = req.slots ?? [];
        const g = presetGen(st.presets.find(p => p.id === req.preset) ?? preset());
        const body = {
            input: req.base,
            model: s.model,
            action: 'generate',
            parameters: {
                params_version: 3,
                width: req.w,
                height: req.h,
                scale: g.scale,
                sampler: g.sampler,
                steps: g.steps,
                n_samples: 1,
                ucPreset: 3,
                qualityToggle: false,
                seed,
                cfg_rescale: g.cfgRescale,
                noise_schedule: 'karras',
                legacy: false,
                legacy_v3_extend: false,
                add_original_image: true,
                autoSmea: false,
                dynamic_thresholding: false,
                controlnet_strength: 1,
                skip_cfg_above_sigma: null,
                use_coords: coords,
                legacy_uc: false,
                normalize_reference_strength_multiple: true,
                deliberate_euler_ancestral_bug: false,
                prefer_brownian: true,
                characterPrompts: slots.map(sl => ({ prompt: sl.prompt, uc: sl.uc ?? '', center: at(sl), enabled: true })),
                v4_prompt: {
                    caption: { base_caption: req.base, char_captions: slots.map(sl => ({ char_caption: sl.prompt, centers: [at(sl)] })) },
                    use_coords: coords,
                    use_order: true,
                },
                v4_negative_prompt: {
                    caption: { base_caption: req.neg, char_captions: slots.map(sl => ({ char_caption: sl.uc ?? '', centers: [at(sl)] })) },
                    legacy_uc: false,
                },
                negative_prompt: req.neg,
            },
        };

        if (req.ref) Object.assign(body.parameters, {
            director_reference_images: [req.ref],
            director_reference_descriptions: [{ caption: { base_caption: 'character', char_captions: [] }, legacy_uc: false }],
            director_reference_information_extracted: [1],
            director_reference_strength_values: [1],
            director_reference_secondary_strength_values: [0],
        });
        return body;
    }

    const isPng = b => b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47;
    const isWebp = b => b.length > 12 && b[0] === 0x52 && b[1] === 0x49 && b[8] === 0x57 && b[9] === 0x45;
    const isJpeg = b => b.length > 3 && b[0] === 0xff && b[1] === 0xd8;
    const mimeOf = b => isPng(b) ? 'image/png' : isWebp(b) ? 'image/webp' : isJpeg(b) ? 'image/jpeg' : 'application/octet-stream';

    async function inflateRaw(bytes) {
        const ds = new DecompressionStream('deflate-raw');
        const out = new Response(new Blob([bytes]).stream().pipeThrough(ds));
        return new Uint8Array(await out.arrayBuffer());
    }

    async function unzipFirst(buf) {
        const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        let eocd = -1;
        for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
            if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
        }
        if (eocd < 0) throw new Error('NAI 응답 zip 을 읽지 못했습니다.');
        const total = dv.getUint16(eocd + 10, true);
        let p = dv.getUint32(eocd + 16, true);
        const entries = [];
        for (let k = 0; k < total && p + 46 <= buf.length; k++) {
            if (dv.getUint32(p, true) !== 0x02014b50) break;
            const method = dv.getUint16(p + 10, true);
            const compSize = dv.getUint32(p + 20, true);
            const nameLen = dv.getUint16(p + 28, true);
            const extraLen = dv.getUint16(p + 30, true);
            const commentLen = dv.getUint16(p + 32, true);
            const local = dv.getUint32(p + 42, true);
            const name = new TextDecoder().decode(buf.subarray(p + 46, p + 46 + nameLen));
            entries.push({ method, compSize, local, name });
            p += 46 + nameLen + extraLen + commentLen;
        }
        const pickEntry = entries.find(e => /\.(png|webp|jpe?g)$/i.test(e.name)) ?? entries[0];
        if (!pickEntry) throw new Error('NAI 응답 zip 이 비어 있습니다.');
        const lp = pickEntry.local;
        if (dv.getUint32(lp, true) !== 0x04034b50) throw new Error('NAI 응답 zip 이 깨졌습니다.');
        const start = lp + 30 + dv.getUint16(lp + 26, true) + dv.getUint16(lp + 28, true);
        const data = buf.subarray(start, start + pickEntry.compSize);
        if (pickEntry.method === 0) return data.slice();
        if (pickEntry.method === 8) return inflateRaw(data);
        throw new Error(`NAI 응답 zip 압축 방식(${pickEntry.method})을 읽을 수 없습니다.`);
    }
    async function firstImage(buf) {
        if (isPng(buf) || isWebp(buf) || isJpeg(buf)) return buf;
        if (buf[0] === 0x50 && buf[1] === 0x4b) return unzipFirst(buf);
        throw new Error('NAI 응답이 그림이 아닙니다.');
    }

    function naiError(status, text) {
        let msg = String(text ?? '').slice(0, 400);
        try { msg = JSON.parse(msg).message || msg; } catch {}
        const why = status === 401 ? 'NAI 키가 맞지 않습니다. 준비 탭에서 키를 확인해 주세요.'
            : status === 402 ? 'Anlas 가 모자라거나 구독이 필요합니다. 스텝 28 이하 · 1장 · 1024×1024 이하는 Opus 무료입니다.'
            : status === 429 ? 'NAI 가 동시에 하나만 받습니다. 잠시 뒤 다시 시도합니다.'
            : status === 400 ? 'NAI 가 요청을 거절했습니다. 프롬프트나 모델 설정을 확인해 주세요.'
            : `NAI 오류 ${status}`;
        return Object.assign(new Error(`${why} (${msg})`), { status });
    }

    async function callNai(body, stopped = () => st.busy?.stop) {
        const key = await naiKey();
        if (!key) throw new Error('NAI 키가 없습니다. 패널의 준비 탭에서 넣어 주세요.');

        let flaky = 0;
        for (let attempt = 0; ; attempt++) {
            let res, buf;
            try {
                res = await api.nativeFetch(NAI_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key, Accept: '*/*' },
                    body: JSON.stringify(body),
                });
                buf = new Uint8Array(await res.arrayBuffer());
                if (res.ok) return firstImage(buf);
            } catch (error) {
                if (flaky++ < 2 && !stopped()) { console.warn(LOG, 'NAI retry', error); await sleep(3000); continue; }
                throw error;
            }
            const error = naiError(res.status, new TextDecoder().decode(buf));
            if (stopped()) throw error;
            if (res.status === 429 && attempt < 3 && !stopped()) { await sleep(4000 + attempt * 3000); continue; }
            if ((res.status === 408 || res.status >= 500) && flaky++ < 2) { console.warn(LOG, 'NAI retry', error); await sleep(3000); continue; }
            throw error;
        }
    }

    async function toWebp(bytes) {
        try {
            const bmp = await createImageBitmap(new Blob([bytes], { type: mimeOf(bytes) }));
            const width = bmp.width, height = bmp.height;
            const canvas = new OffscreenCanvas(width, height);
            canvas.getContext('2d').drawImage(bmp, 0, 0);
            bmp.close?.();
            const blob = await canvas.convertToBlob({ type: 'image/webp', quality: 0.7 });
            if (blob.type !== 'image/webp') return null;
            const out = new Uint8Array(await blob.arrayBuffer());

            const exif = exifOf(pngTexts(bytes));
            if (!exif) return out;
            try { return webpWithExif(out, exif, width, height); } catch (error) { console.warn(LOG, 'exif', error); return out; }
        } catch (error) {
            console.warn(LOG, 'webp', error);
            return null;
        }
    }

    function pngTexts(b) {
        const out = {};
        if (!isPng(b)) return out;
        const dv = new DataView(b.buffer, b.byteOffset, b.byteLength), dec = new TextDecoder();
        for (let p = 8; p + 12 <= b.length;) {
            const len = dv.getUint32(p), type = String.fromCharCode(b[p + 4], b[p + 5], b[p + 6], b[p + 7]);
            const d = b.subarray(p + 8, p + 8 + len);
            const z = d.indexOf(0);
            if ((type === 'tEXt' || type === 'iTXt') && z > 0) {
                const key = dec.decode(d.subarray(0, z));
                if (type === 'tEXt') out[key] = dec.decode(d.subarray(z + 1));
                else if (d[z + 1] === 0) {
                    const lang = d.indexOf(0, z + 3), tr = lang < 0 ? -1 : d.indexOf(0, lang + 1);
                    if (tr > 0) out[key] = dec.decode(d.subarray(tr + 1));
                }
            }
            if (type === 'IEND') break;
            p += 12 + len;
        }
        return out;
    }

    function exifOf(t) {
        const enc = new TextEncoder();
        const ascii = v => { const u = enc.encode(v); const a = new Uint8Array(u.length + 1); a.set(u); return a; };
        const ifd0 = [], sub = [];
        const desc = t.Description ?? t.Title;
        if (desc) ifd0.push({ tag: 0x010e, type: 2, data: ascii(desc) });
        if (t.Source) ifd0.push({ tag: 0x0110, type: 2, data: ascii(t.Source) });
        if (t.Software) ifd0.push({ tag: 0x0131, type: 2, data: ascii(t.Software) });
        if (t.Comment) {
            const c = new Uint8Array(8 + t.Comment.length * 2);
            c.set([0x55, 0x4e, 0x49, 0x43, 0x4f, 0x44, 0x45, 0]);
            for (let i = 0; i < t.Comment.length; i++) { const u = t.Comment.charCodeAt(i); c[8 + i * 2] = u >> 8; c[9 + i * 2] = u & 255; }
            sub.push({ tag: 0x9286, type: 7, data: c });
        }
        if (!ifd0.length && !sub.length) return null;
        if (sub.length) ifd0.push({ tag: 0x8769, type: 4, data: new Uint8Array(4) });
        const size = es => 2 + es.length * 12 + 4 + es.reduce((n, e) => n + (e.data.length > 4 ? e.data.length + (e.data.length & 1) : 0), 0);
        const at1 = 8 + size(ifd0);
        if (sub.length) new DataView(ifd0[ifd0.length - 1].data.buffer).setUint32(0, at1);
        const buf = new Uint8Array(at1 + (sub.length ? size(sub) : 0)), dv = new DataView(buf.buffer);
        buf.set([0x4d, 0x4d, 0, 42, 0, 0, 0, 8]);
        const put = (es, at) => {
            dv.setUint16(at, es.length);
            let data = at + 2 + es.length * 12 + 4;
            es.forEach((e, k) => {
                const q = at + 2 + k * 12;
                dv.setUint16(q, e.tag); dv.setUint16(q + 2, e.type); dv.setUint32(q + 4, e.type === 4 ? 1 : e.data.length);
                if (e.data.length <= 4) buf.set(e.data, q + 8);
                else { dv.setUint32(q + 8, data); buf.set(e.data, data); data += e.data.length + (e.data.length & 1); }
            });
            dv.setUint32(at + 2 + es.length * 12, 0);
        };
        put(ifd0, 8);
        if (sub.length) put(sub, at1);
        return buf;
    }

    function webpWithExif(w, exif, width, height) {
        const id = p => String.fromCharCode(w[p], w[p + 1], w[p + 2], w[p + 3]);
        const le = (n, k = 4) => Array.from({ length: k }, (_, i) => (n >>> (8 * i)) & 255);
        const chunk = (name, d) => { const c = new Uint8Array(8 + d.length + (d.length & 1)); c.set([...name].map(x => x.charCodeAt(0))); c.set(le(d.length), 4); c.set(d, 8); return c; };
        if (id(0) !== 'RIFF' || id(8) !== 'WEBP') throw new Error('not webp');
        const first = id(12);
        let head = new Uint8Array(0), body = w.slice(12);
        if (first === 'VP8X') body[8] |= 0x08;
        else if (first === 'VP8 ' || first === 'VP8L') head = chunk('VP8X', new Uint8Array([first === 'VP8L' ? 0x18 : 0x08, 0, 0, 0, ...le(width - 1, 3), ...le(height - 1, 3)]));
        else throw new Error('webp ' + first);
        const tail = chunk('EXIF', exif);
        const all = new Uint8Array(12 + head.length + body.length + tail.length);
        all.set([0x52, 0x49, 0x46, 0x46, ...le(all.length - 8), 0x57, 0x45, 0x42, 0x50]);
        all.set(head, 12); all.set(body, 12 + head.length); all.set(tail, 12 + head.length + body.length);
        return all;
    }

    async function shrinkImage(bytes, maxW = 240) {
        try {
            const bmp = await createImageBitmap(new Blob([bytes], { type: mimeOf(bytes) }));
            const k = Math.min(1, maxW / bmp.width);
            const canvas = new OffscreenCanvas(Math.max(1, Math.round(bmp.width * k)), Math.max(1, Math.round(bmp.height * k)));
            canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
            bmp.close?.();
            let blob = await canvas.convertToBlob({ type: 'image/webp', quality: 0.7 });
            if (blob.type !== 'image/webp') blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.85 });
            return await new Promise((ok, no) => {
                const r = new FileReader();
                r.onload = () => ok(String(r.result));
                r.onerror = () => no(r.error);
                r.readAsDataURL(blob);
            });
        } catch (error) {
            console.warn(LOG, 'shrink', error);
            return '';
        }
    }
    async function setArtistThumb(presetId, bytes, path) {
        const p = st.presets.find(x => x.id === presetId);

        if (!p || !bytes || BUILTIN_THUMB[p.id]) return;
        p.thumb = await shrinkImage(bytes);
        p.thumbPath = path ?? '';
        p.thumbAt = Date.now();
        savePresets();
    }

    let queue = Promise.resolve();

    let gen = 0;

    const queued = new Map();

    const failed = new Map();

    const jobsOn = new Set();
    function enqueue(job) {
        job.gen = gen;
        st.jobs++;
        if (job.key) failed.delete(job.key);
        if (job.key) queued.set(job.key, (queued.get(job.key) ?? 0) + 1);
        jobsOn.add(job);
        render();
        void rootQueue(() => paintBusy());
        const p = queue.then(() => runJob(job));
        queue = p.catch(() => {}).finally(() => {
            st.jobs--;
            jobsOn.delete(job);
            if (job.key) { const n = (queued.get(job.key) ?? 1) - 1; if (n > 0) queued.set(job.key, n); else queued.delete(job.key); }
            render();
            void rootQueue(() => paintBusy());
        });
        return p;
    }

    const STAGES = ['연출', '그리기', '저장'];

    function cancelAll() {
        gen++;
        const b = st.busy;
        if (b && !b.stop) { b.stop = true; b.onStop?.(); }
        renderNow();
        void rootQueue(() => paintBusy());
    }

    async function runJob(job) {
        if (job.gen !== gen) throw stopError();

        const busy = { label: job.label ?? `${kindName()} 그리는 중`, at: Date.now(), stage: 0, i: 0, n: 0, stop: false, llm: st.set.llm, auto: !!job.auto, key: job.key ?? '', ci: job.ci, chi: job.chi, idx: job.idx, job };
        busy.halt = new Promise(resolve => { busy.onStop = resolve; });
        st.busy = busy;
        st.err = '';
        st.note = '';
        st.ok = false;
        render();

        let editSaved = '';
        try {
            if (!(await naiKey())) throw new Error('NAI 키가 없습니다. 준비 탭에서 넣어 주세요.');
            const char = await api.getCharacterFromIndex(job.ci);
            const chat = await api.getChatFromIndex(job.ci, job.chi);
            if (!char || !chat) throw new Error('채팅을 찾지 못했습니다.');
            const idx = findMsg(chat, job.key, job.idx ?? lastBotIndex(chat));
            if (idx < 0) throw new Error('그릴 답변을 찾지 못했습니다.');
            const msg = chat.message[idx];
            const key = msgKeyOf(msg, idx, chat.message);
            busy.key = key;
            busy.idx = idx;
            busy.chat = chatKeyOf(chat, job.chi);
            const chaId = char.chaId;
            const recs = await loadRecs(chaId);

            const oldKey = recKeyIn(recs, chat, key, idx);
            if (oldKey && oldKey !== key) {
                recs[key] = recs[oldKey];
                delete recs[oldKey];
                await saveRecs(chaId, recs);
            }
            const old = recs[key];
            const cast = await loadCast(chaId);
            const state = readState(chat);
            let reqs, plan = old?.plan ?? null, stateChanged = false;

            if (job.mode === 'draw') {
                if (!old?.images?.length) throw new Error('다시 그릴 기록이 없습니다.');

                const pick = job.only ? old.images.filter(x => x.name === job.only) : old.images;
                if (!pick.length) throw new Error('다시 그릴 그림을 기록에서 찾지 못했습니다.');
                reqs = pick.map(x => x.req);
            } else if (job.mode === 'edit') {
                reqs = job.reqs;
            } else {

                if (!cast.list.length && !cast.tried && job.ci === await api.getCurrentCharacterIndex()) {
                    busy.label = '로어북 읽는 중';
                    busy.lore = true;
                    render();
                    try {
                        mergeCast(cast, await readLore(char));
                    } catch (error) {
                        if (error.isStop) throw error;
                        console.warn(LOG, 'lore', error);
                        cast.tried = true;
                    }
                    await saveCast(chaId, cast);
                    busy.label = job.label ?? `${kindName()} 그리는 중`;
                    busy.lore = false;
                    busy.at = Date.now();
                    render();
                }
                if (!st.persona) await loadPersona();
                const input = userInputOf(chat, idx);
                const emphasize = !!input && !!st.set.userFirst;
                plan = await askJson(comicSystem(emphasize, !!input && !emphasize), comicUser(char, chat, idx, cast, state, st.persona?.name, input, emphasize), 'images',
                    v => Array.isArray(v.images) && v.images.some(x => x && typeof x === 'object') ? '' : '모델이 그림 연출을 돌려주지 않았습니다.');
                if (busy.stop) throw stopError();

                if (emphasize) console.log(LOG, 'focus', plan.focus ?? '(none)');

                state.wear ??= {};
                const fresh = await resolveUnknown(char, plan, cast, state);
                if (busy.stop) throw stopError();
                if (applyState(plan, cast, state, fresh) || fresh.size) await saveCast(chaId, cast);
                stateChanged = true;
                let images = (Array.isArray(plan.images) ? plan.images : []).filter(x => x && typeof x === 'object');
                if (!images.length) throw new Error('모델이 그림 연출을 돌려주지 않았습니다.');
                images = images.slice(0, countNow());

                checkLang(images, plainText(msg.data, 8000) + (emphasize ? '\n' + plainText(input.data) : ''));

                if (tidy(plan.genre)) images = images.map(img => tidy(img.genre) ? img : { ...img, genre: plan.genre });
                if (askGenre()) console.log(LOG, 'genre', images.map(img => `${img.genre ?? '(none)'} → ${genreKey(img.genre) || '-'}${monoNow() ? ` · severity ${severityOf(img) || '-'}${isDynamic(img) ? ' · dynamic' : ''}` : ''}`).join(' | '));
                reqs = images.map(img => buildReq(img, cast, state));
            }

            busy.stage = 1;
            busy.n = reqs.length;
            const out = [];
            let firstBytes = null;
            for (let i = 0; i < reqs.length; i++) {
                busy.i = i + 1;
                busy.at = Date.now();
                render();
                if (busy.stop) throw stopError();
                const seed = randSeed();
                const work = callNai(naiBody(reqs[i], seed));
                work.catch(() => {});
                let bytes = await Promise.race([work, busy.halt]);
                if (busy.stop) throw stopError();
                let ext = isWebp(bytes) ? 'webp' : 'png';
                if (st.set.webp && ext === 'png') {
                    const w = await toWebp(bytes);
                    if (w) { bytes = w; ext = 'webp'; }
                }
                const path = await api.saveAsset(bytes);
                if (i === 0) firstBytes = bytes;
                out.push({ name: 'nc_' + uid(), path, ext, seed, req: reqs[i], title: reqs[i].title ?? '' });
            }

            if (busy.stop) throw stopError();

            busy.stage = 2;
            busy.at = Date.now();
            render();
            await commit(job, char, key, idx, out, stateChanged ? state : null, cast);
            const images = job.only ? old.images.map(x => x.name === job.only ? out[0] : x) : out;
            recs[key] = {
                key, idx, chat: chatKeyOf(chat, job.chi), at: Date.now(), hash: msgHash(msg),
                excerpt: excerpt(msg.data, 80), plan, images, group: char.type === 'group',
            };
            await saveRecs(chaId, recs);
            if (job.mode === 'edit') editSaved = key;
            await setArtistThumb(reqs[0]?.preset ?? st.presetId, firstBytes, out[0]?.path);
            for (const x of old?.images ?? []) if (!images.includes(x)) thumbs.delete(x.path);
            failed.delete(key);
            st.ok = true;
            st.note = `${out.length}장을 그려 ${char.type === 'group' ? '패널 기록에' : '봇에'} 저장했습니다.`;
        } catch (error) {
            if (error.isStop) st.note = '중단했습니다.';
            else {
                console.error(LOG, 'job', error);
                st.err = error.message || String(error);
                if (busy.key) failed.set(busy.key, { at: Date.now(), error: st.err, raw: error.raw ?? '', idx: busy.idx ?? job.idx, chat: busy.chat ?? '', ci: job.ci, chi: job.chi });

                if (job.alertFail && !ui.root?.isConnected) void api.alertError?.(`이매진: ${st.err}`);

                else if (job.auto && !ui.root?.isConnected) tellOnce('auto:' + st.err, `이매진 (자동 그리기): ${st.err}`);
            }
        } finally {
            if (st.busy === busy) st.busy = null;
            if (ui.root?.isConnected) await refreshView().catch(() => {});

            if (editSaved) { delete st.drafts[editSaved]; if (job.key) delete st.drafts[job.key]; }
            render();
        }
    }

    function blockedRanges(src) {
        const out = [];
        const scan = re => { for (const m of src.matchAll(re)) out.push([m.index, m.index + m[0].length]); };
        scan(/```[\s\S]*?(?:```|$)/g);
        scan(/<style[\s\S]*?(?:<\/style>|$)/gi);
        scan(/<script[\s\S]*?(?:<\/script>|$)/gi);
        scan(/<[a-z\/!][^>]*>/gi);
        scan(/\{\{[\s\S]*?\}\}/g);
        scan(MARK_RE);
        return out;
    }

    const MARK_RE = /♬\[[^\]\n]*\]♬|♣️?\[[^\]\n]*\]♣️?|⟦[^⟧\n]*⟧|\[[A-Z][A-Z0-9_]*(?::[^\[\]\n]*)?\]|<<[A-Z][A-Z0-9_]*(?::[^<>\n]*)?>>/g;

    function tailStart(src) {
        let end = src.length;
        let marks = false;
        for (;;) {
            const start = src.lastIndexOf('\n', end - 1) + 1;
            const line = src.slice(start, end).trim();
            const rest = line.replace(MARK_RE, '').trim();
            if (rest !== line) marks = true;
            if (rest && !(marks && /^(?:\*{3,}|-{3,}|_{3,})$/.test(rest))) {
                if (!marks) return src.length;
                let at = end;
                while (at > start && /\s/.test(src[at - 1])) at--;
                return at;
            }
            if (start === 0) return src.length;
            end = start - 1;
        }
    }
    const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    function findQuote(src, quote) {

        const q = tidy(quote).replace(/["“”「」『』]/g, '').replace(/^['‘’]+|['‘’]+$/g, '').trim();
        if (q.length < 4) return -1;
        const tries = [q];
        if (q.length > 12) tries.push(q.slice(-12), q.slice(0, 12));
        if (q.length > 8) tries.push(q.slice(-8));
        const QM = '["“”「」『』]*';
        for (const t of tries) {
            const re = new RegExp(t.trim().split(/\s+/).map(w => [...w].map(escapeRe).join(QM)).join(QM + '\\s+' + QM));
            const m = re.exec(src);
            if (m) return m.index + m[0].length;
        }
        return -1;
    }

    function lineEndAfter(src, pos, blocked) {
        for (let guard = 0; guard < 20; guard++) {
            let end = src.indexOf('\n', pos);
            if (end < 0) end = src.length;
            while (end > pos && /\s/.test(src[end - 1])) end--;
            const hit = blocked.find(([s, e]) => s < end && end < e);
            if (!hit) return end;
            pos = hit[1];
        }
        return src.length;
    }

    function placeTags(text, items) {
        const src = stripOurs(text);
        const blocked = blockedRanges(src);

        const tail = tailStart(src);
        const spots = items.map((it, order) => {
            const hit = it.after ? findQuote(src, it.after) : -1;
            return { tag: figTag(it.name), at: Math.min(tail, hit < 0 ? src.length : lineEndAfter(src, hit, blocked)), order };
        });
        spots.sort((a, b) => a.at - b.at || a.order - b.order);
        let out = '';
        let last = 0;
        for (const s of spots) {
            out += src.slice(last, s.at) + '\n\n' + s.tag;
            last = s.at;
        }
        return out + src.slice(last);
    }

    async function commit(job, char0, key, idx, out, state, cast) {
        const recs = await loadRecs(char0.chaId);
        const oldNames = new Set(job.only ? [job.only] : (recs[key]?.images ?? []).map(x => x.name));
        const isChar = char0.type !== 'group';
        if (isChar) {
            const char = await api.getCharacterFromIndex(job.ci);
            if (char && char.chaId === char0.chaId) {
                char.additionalAssets = (char.additionalAssets ?? []).filter(a => !oldNames.has(a?.[0]));
                for (const o of out) char.additionalAssets.push([o.name, o.path, o.ext]);
                putVars(char);
                await api.setCharacterToIndex(job.ci, char);
            }
        }
        const chat = await api.getChatFromIndex(job.ci, job.chi);
        if (!chat) return;
        const i = findMsg(chat, key, idx);
        if (i >= 0) {
            const m = chat.message[i];

            if (job.only) {
                if (isChar && out.length) m.data = String(m.data ?? '').replace(new RegExp(escapeRe(job.only) + '(?![a-z0-9_])', 'gi'), out[0].name);
            } else {
                m.data = isChar && out.length
                    ? placeTags(m.data, out.map(o => ({ name: o.name, after: o.req?.after })))
                    : stripOurs(m.data);
            }
        }
        if (state) writeStateInto(chat, state, cast);
        await api.setChatToIndex(job.ci, job.chi, chat);
    }

    async function removeRecord(rec) {
        const v = st.view;
        if (!v) return;
        const names = new Set((rec.images ?? []).map(x => x.name));
        if (!rec.group) {
            const char = await api.getCharacterFromIndex(v.ci);
            if (char?.chaId === v.chaId) {
                char.additionalAssets = (char.additionalAssets ?? []).filter(a => !names.has(a?.[0]));
                await api.setCharacterToIndex(v.ci, char);
            }
        }
        const chat = await api.getChatFromIndex(v.ci, v.chi);
        const i = findMsg(chat, rec.key, rec.idx);
        if (chat && i >= 0) {
            const m = chat.message[i];
            m.data = String(m.data ?? '').replace(TAG_RE, tag => [...names].some(n => tag.toLowerCase().includes(n)) ? '' : tag).replace(/\s+$/, '');
            await api.setChatToIndex(v.ci, v.chi, chat);
        }
        const recs = await loadRecs(v.chaId);
        delete recs[rec.key];
        await saveRecs(v.chaId, recs);
    }

    const autoSeen = new Map();
    async function onOutput(ev) {
        try {
            if (!st.set.auto || !setupDone()) return;
            const { characterIndex: ci, chatIndex: chi, messageIndex } = ev ?? {};
            const msg = ev?.chat?.message?.[messageIndex];
            if (!msg || msg.role !== 'char' || !Number.isInteger(ci) || !Number.isInteger(chi)) return;
            const key = msgKeyOf(msg, messageIndex, ev.chat.message);
            const hash = msgHash(msg);
            const seenKey = `${ev.char?.chaId}|${key}`;
            if (autoSeen.get(seenKey) === hash) return;
            autoSeen.set(seenKey, hash);
            if (autoSeen.size > 500) autoSeen.delete(autoSeen.keys().next().value);
            const recs = await loadRecs(ev.char?.chaId);
            if (recs[key]?.hash === hash) return;
            if (!(await naiKey())) { tellOnce('nokey', NO_KEY_AUTO); return; }

            setTimeout(() => {
                enqueue({ ci, chi, key, idx: messageIndex, mode: 'new', auto: true, label: '새 답변 그리는 중' }).catch(() => {});
            }, 1500);
        } catch (error) {
            console.warn(LOG, 'output listener', error);
        }
    }

    let settleTimer = null;
    function onOutputText(content) {
        try {
            if (st.set.auto && setupDone()) {
                clearTimeout(settleTimer);
                settleTimer = setTimeout(() => {
                    settleTimer = null;
                    checkLatest().catch(error => console.warn(LOG, 'output settle', error));
                }, 2500);
            }
        } catch {}
        try { return wrapPortraits(content); } catch { return content; }
    }
    async function checkLatest() {
        const ci = await api.getCurrentCharacterIndex();
        const chi = await api.getCurrentChatIndex();
        if (!Number.isInteger(ci) || !Number.isInteger(chi) || ci < 0 || chi < 0) return;
        const char = await api.getCharacterFromIndex(ci);
        const chat = await api.getChatFromIndex(ci, chi);
        const msgs = chat?.message ?? [];
        const idx = msgs.length - 1;
        if (idx < 0 || msgs[idx]?.role !== 'char') return;

        await onOutput({ char, chat, characterIndex: ci, chatIndex: chi, messageIndex: idx });
    }

    function stripProcess(text) {
        if (typeof text !== 'string') return text;
        text = unwrapPortraits(text);
        if (!text.includes('::nc_')) return text;
        return text.replace(TAG_RE, '');
    }
    function stripRequest(messages) {
        try {
            for (const m of messages ?? []) {
                if (typeof m?.content === 'string') {
                    m.content = unwrapPortraits(m.content);
                    if (m.content.includes('::nc_')) m.content = m.content.replace(TAG_RE, '');
                } else if (Array.isArray(m?.content)) {
                    for (const part of m.content) {
                        if (typeof part?.text === 'string') part.text = unwrapPortraits(part.text);
                        if (typeof part?.text === 'string' && part.text.includes('::nc_')) part.text = part.text.replace(TAG_RE, '');
                    }
                }
            }
        } catch {}
        return messages;
    }

    const HIDE_DECL = 'display:none!important;--nc-hide:1;';

    const HIDE_ATTR = ` style=${HIDE_DECL} `;
    const HIDE_OPEN = `<span style=${HIDE_DECL}>`;
    const HIDE_CLOSE = '</span><!--/nc-hide-->';

    const HIDE_BG = 'background-image:none!important;--nc-hide:1;';
    const hasHide = s => String(s ?? '').includes('--nc-hide:1;');

    const unhide = s => [HIDE_ATTR, HIDE_OPEN, HIDE_CLOSE, HIDE_DECL, HIDE_BG].reduce((t, m) => t.split(m).join(''), String(s ?? ''));
    const HIDE_IMAGE = /background(-image)?\s*:[^;]*url\(|<img\b|<video\b|<picture\b|url\(|\{\{\s*(raw|img|image|asset|source|inlay|inlayed|bg|emotion|path)\s*::|\.(webp|png|jpe?g|gif|avif)\b|object-fit|background-size/i;
    const HIDE_LINE = /<(img|video|picture)\b|url\(|\{\{\s*(raw|img|image|asset|source|inlay|inlayed|bg|emotion|path)\s*::|\.(webp|png|jpe?g|gif|avif)\b/i;

    const RESIZE_MARKS = ['리사이징 갱신용 (지우지 마세요)', '이매진 갱신용 (지우지 마세요)'];

    const TOKEN_LIMIT = /context[_ ]?(length|window)|max(imum)?[_ ]?(context|tokens?)|(prompt|input|request|message|context)([_ ]body)?([_ ](is|was))?[_ ]too[_ ](long|large)|too[_ ]many[_ ]tokens|exceed\w*[\s\S]{0,60}tokens?|tokens?[\s\S]{0,60}(exceed|limit)|토큰[\s\S]{0,20}(초과|넘)|컨텍스트[\s\S]{0,20}(초과|넘)|\b413\b/i;
    const isTokenLimit = error => !error?.isStop && TOKEN_LIMIT.test(String(error?.message ?? error ?? ''));

    const botHidden = char => hasHide(char?.backgroundHTML)
        || (char?.customscript ?? []).some(s => hasHide(s?.out))
        || (Array.isArray(char?.triggerscript) ? char.triggerscript : []).some(t => hasHide(t?.effect?.[0]?.code));

    function setAssetOff(chaId, on) {
        if (!chaId || st.set.assetOff.includes(chaId) === on) return false;
        st.set = { ...st.set, assetOff: on ? [...st.set.assetOff, chaId] : st.set.assetOff.filter(x => x !== chaId) };
        saveSet();
        return true;
    }

    function hideTargets(char) {
        const out = [];
        const bg = String(char?.backgroundHTML ?? '');
        if (HIDE_IMAGE.test(bg)) out.push({ id: 'bg', label: '백그라운드 임베딩', text: bg });
        (char?.customscript ?? []).forEach((s, i) => {
            const text = String(s?.out ?? '');

            if (!s || s.type !== 'editdisplay' || RESIZE_MARKS.includes(s.comment) || !HIDE_IMAGE.test(text)) return;
            out.push({ id: 'script:' + i, index: i, label: s.comment?.trim() || `이름 없는 정규식 ${i + 1}`, text, input: String(s.in ?? ''), comment: s.comment ?? '' });
        });

        (Array.isArray(char?.triggerscript) ? char.triggerscript : []).forEach((t, i) => {
            const fx = t?.effect?.[0];
            const text = String(fx?.code ?? '');
            if (fx?.type !== 'triggerlua' || !HIDE_IMAGE.test(text)) return;
            out.push({ id: 'lua:' + i, index: i, lua: true, label: t.comment?.trim() || `이름 없는 Lua 트리거 ${i + 1}`, text, comment: t.comment ?? '' });
        });
        return out;
    }

    const LUA_OMIT = '-- …(omitted)…';
    function luaExcerpt(text) {
        const lines = text.split('\n');
        const keep = new Set();
        lines.forEach((l, i) => { if (HIDE_LINE.test(l)) for (let k = Math.max(0, i - 3); k <= Math.min(lines.length - 1, i + 3); k++) keep.add(k); });
        const out = [];
        lines.forEach((l, i) => { if (keep.has(i)) out.push(l); else if (out.at(-1) !== LUA_OMIT) out.push(LUA_OMIT); });
        return out.join('\n');
    }

    const HIDE_SYSTEM = `You read the source of a RisuAI character card and find every place where the card shows its own image assets (character art, CG, standing pictures, background pictures, illustrations), so that a plugin can hide those images on screen for this card only.

The source has three kinds of target:
- [bg] the background embedding (HTML / CSS added to the chat screen)
- [script:N] a regex script. OUT is the HTML that replaces the matched chat text ($1 etc. are captures, {{…}} is CBS template syntax)
- [lua:N] a Lua trigger. HTML / CSS appears inside Lua strings

Report one hide item per image. Pick the kind that hides it most cleanly:
- "tag": the opening tag of the element to hide. find starts with "<" and the tag name, copied verbatim, e.g. "<img src=\\"{{raw::$1}}\\"". Prefer the frame element that holds only the image, so no empty box is left. Never pick an element that also holds story text, dialogue, a status panel or buttons; then hide the <img> / <video> / <picture> or the image box itself.
- "rule": a CSS rule that paints an image with background / background-image url(…). Only its background image is removed; the element and its contents stay. find is the rule's selector up to and including "{", copied verbatim, e.g. ".cg-bg {".
- "cbs": a CBS that outputs an image by itself, outside any HTML tag, e.g. "{{img::$1}}", "{{image::smile}}", "{{asset::bg}}", "{{emotion::…}}". find is the whole CBS, copied verbatim.

Rules:
- find is copied character for character from that target and occurs exactly once in it. If the same text occurs more than once, extend find with the characters that follow until it is unique (a "tag" find still starts at "<").
- Do not hide small UI icons, emoji, buttons, borders, decorative patterns or text.
- Do not touch elements whose class starts with "nc-" (another plugin's pictures). Image frames with "ix-" classes or {{getvar::imagine_…}} sizes are this card's images resized by a plugin: hide them like any other image.
- If a target has no image, report nothing for it. If nothing should be hidden, return an empty list.

Output a single JSON object only:
{"hide":[{"target":"script:0","kind":"tag","find":"<div class=\\"cg\\">"}],"summary":"one short Korean sentence: what was hidden"}`;

    function hidePrompt(targets, luaMode) {
        const parts = [];
        for (const t of targets) {
            if (t.lua && luaMode === 'none') continue;
            const cut = t.lua && luaMode === 'cut';
            const head = t.id === 'bg' ? '### [bg] Background embedding'
                : t.lua ? `### [${t.id}] Lua trigger "${t.label}"\nCODE${cut ? ` (excerpt: "${LUA_OMIT}" marks code that was left out; copy find only from the lines shown)` : ''}:`
                : `### [${t.id}] Regex "${t.label}"\nIN: ${t.input}\nOUT:`;
            parts.push(head + '\n' + (cut ? luaExcerpt(t.text) : t.text));
        }
        return { text: '[SOURCE]\n' + parts.join('\n\n'), sent: parts.length };
    }

    function checkHide(item, byId, luaMode) {
        const t = byId[item?.target];
        if (!t) return 'unknown target';
        if (t.lua && luaMode === 'none') return 'that target was not sent';
        const kind = item.kind;
        const find = String(item.find ?? '');
        if (!['tag', 'rule', 'cbs'].includes(kind)) return 'kind must be "tag", "rule" or "cbs"';
        if (!find.trim()) return 'find is empty';
        const at = t.text.indexOf(find);
        if (at < 0) return 'find was not found verbatim in that target';
        if (t.text.indexOf(find, at + 1) >= 0) return 'find occurs more than once in that target';
        if (kind === 'tag') {
            const m = /^<([a-zA-Z][\w-]*)/.exec(find);
            if (!m) return 'a "tag" find must start with "<" and the tag name';
            if (/^(html|head|body|style|script|br|hr)$/i.test(m[1])) return `<${m[1]}> cannot be hidden`;
            return { kind, at, pos: at + m[0].length };
        }
        if (kind === 'rule') {
            const body = find.trimEnd();
            if (!body.endsWith('{') || body.length < 2) return 'a "rule" find must be the selector ending with "{"';
            return { kind, at, pos: at + body.length };
        }
        const cbs = find.trim();
        if (!/^\{\{[\s\S]*\}\}$/.test(cbs)) return 'a "cbs" find must be one whole {{…}}';
        const start = at + find.indexOf(cbs);
        const before = t.text.slice(0, start);
        if (before.lastIndexOf('<') > before.lastIndexOf('>')) return 'this CBS is inside an HTML tag; report that tag with kind "tag" instead';
        if (/url\(\s*["']?$/i.test(before) || before.toLowerCase().lastIndexOf('<style') > before.toLowerCase().lastIndexOf('</style')) return 'this CBS is inside CSS; report its CSS rule with kind "rule" instead';
        return { kind, at: start, pos: start + cbs.length };
    }
    function sortHide(res, byId, luaMode) {
        const ok = [], bad = [];
        const seen = new Set();
        for (const item of Array.isArray(res?.hide) ? res.hide : []) {
            const r = checkHide(item, byId, luaMode);
            if (typeof r === 'string') { bad.push({ target: String(item?.target ?? '?'), find: String(item?.find ?? ''), error: r }); continue; }
            const key = `${item.target}@${r.kind === 'cbs' ? r.at : r.pos}`;
            if (seen.has(key)) continue;
            seen.add(key);
            ok.push({ target: item.target, ...r });
        }
        return { ok, bad };
    }
    function applyHide(text, items) {
        const ins = [];
        for (const it of items) {
            if (it.kind === 'tag') ins.push([it.pos, HIDE_ATTR]);
            else if (it.kind === 'rule') ins.push([it.pos, HIDE_BG]);
            else ins.push([it.pos, HIDE_CLOSE], [it.at, HIDE_OPEN]);
        }

        ins.sort((a, b) => b[0] - a[0]);
        let out = text;
        for (const [p, s] of ins) out = out.slice(0, p) + s + out.slice(p);
        return out;
    }

    function hideSlot(char, t) {
        if (t.id === 'bg') return { get: () => String(char.backgroundHTML ?? ''), set: x => { char.backgroundHTML = x; } };
        if (t.lua) {
            const tr = Array.isArray(char.triggerscript) ? char.triggerscript[t.index] : null;
            const fx = tr?.effect?.[0];
            if (!fx || fx.type !== 'triggerlua' || (tr.comment ?? '') !== t.comment) return null;
            return { get: () => String(fx.code ?? ''), set: x => { fx.code = x; } };
        }
        const s = char.customscript?.[t.index];
        if (!s || (s.comment ?? '') !== t.comment || String(s.in ?? '') !== t.input) return null;
        return { get: () => String(s.out ?? ''), set: x => { s.out = x; } };
    }

    const hide = { job: null, msg: null };
    const HIDE_EASE_MS = 20000;

    const hideFrac = job => job.span[0] + (job.span[1] - job.span[0]) * (1 - Math.exp(-(Date.now() - job.t0) / HIDE_EASE_MS));
    function hideStage(job, label, span) {
        job.label = label;
        job.span = span;
        job.t0 = Date.now();
        render();
    }
    function paintHide() {
        const job = hide.job;
        const fill = ui.root?.querySelector('.hb-fill');
        if (!job || !fill) return;
        fill.style.width = (hideFrac(job) * 100).toFixed(1) + '%';
    }

    const hideRetryNote = error => `\n\n[NOTE] Your previous response could not be used${error?.hint ? `: ${error.hint}` : ''}. Output a single valid JSON object only, with no explanation. Inside string values write a double quote as \\".`;

    async function hideAsk(job, user) {
        let lastError;
        for (let attempt = 0; attempt < 2; attempt++) {
            if (job.stop) throw stopError();
            const work = requestModel(HIDE_SYSTEM, attempt ? user + hideRetryNote(lastError) : user, true, st.set.llm);
            work.catch(() => {});
            const text = await Promise.race([work, job.halt]);
            if (job.stop) throw stopError();
            try {
                const v = parseJson(text, 'hide');
                if (!('hide' in v)) throw askError('응답 JSON에 hide 항목이 없습니다.', 'the JSON had no "hide" key');
                return v;
            } catch (error) {
                lastError = error;
                console.warn(LOG, 'hide parse', error, String(text).slice(0, 1000));
            }
        }
        throw lastError;
    }

    async function runHide() {
        const v = st.view;
        if (!v || v.group || hide.job) return;

        if (st.jobs > 0) {
            hide.msg = { cls: 'warn', chaId: v.chaId, text: '그림을 그리는 중입니다. 다 그린 뒤에 다시 눌러 주세요.' };
            renderNow();
            return;
        }
        const job = { chaId: v.chaId, ci: v.ci, stop: false, saving: false, label: '', span: [0, 0.85], t0: Date.now() };
        job.halt = new Promise(resolve => { job.onStop = resolve; });
        hide.job = job;
        hide.msg = null;
        job.tick = setInterval(paintHide, 200);
        let mode = 'full';
        try {
            hideStage(job, '숨길 그림을 찾는 중', [0, 0.85]);
            const char = await api.getCharacterFromIndex(job.ci);
            if (!char || char.chaId !== job.chaId) throw new Error('봇을 읽지 못했습니다.');
            const targets = hideTargets(char);
            if (!targets.length) {

                setAssetOff(job.chaId, true);
                await redrawChat().catch(error => console.warn(LOG, 'hide redraw', error));
                if (st.view?.chaId === job.chaId) st.view.hidden = true;
                hide.msg = { cls: 'ok', chaId: job.chaId, text: '백그라운드 임베딩 · 정규식 · Lua 트리거에는 그림을 그리는 곳이 없었습니다. 메시지 · 첫 메시지에 바로 쓴 에셋 그림({{img::…}} 등)을 화면에서 숨겼습니다.' };
                return;
            }
            const byId = Object.fromEntries(targets.map(t => [t.id, t]));

            const modes = targets.some(t => t.lua) ? ['full', 'cut', 'none'] : ['full'];
            let res = null, prompt = null;
            for (const m of modes) {
                const p = hidePrompt(targets, m);
                if (!p.sent) break;
                mode = m;
                prompt = p;
                try {
                    res = await hideAsk(job, p.text);
                    break;
                } catch (error) {
                    if (!isTokenLimit(error) || m === modes.at(-1)) throw error;
                    console.warn(LOG, 'hide token limit', m, error);
                    hideStage(job, m === 'full' ? '원문이 길어 Lua 를 그림 줄만 남겨 다시 묻는 중' : '그래도 길어 Lua 를 빼고 다시 묻는 중', [0, 0.85]);
                }
            }
            if (!res) throw new Error('원문이 길어 보내지 못했습니다. 이 봇은 Lua 트리거 말고는 보낼 곳이 없습니다.');
            let { ok, bad } = sortHide(res, byId, mode);
            if (bad.length) {
                hideStage(job, '맞지 않는 자리를 다시 묻는 중', [0.85, 0.95]);
                const why = bad.map((b, i) => `${i + 1}. [${b.target}] ${b.error}\nfind: ${b.find.slice(0, 200)}`).join('\n');
                const again = await hideAsk(job, prompt.text + '\n\n[PROBLEMS IN THE PREVIOUS RESPONSE]\nThe items below could not be used. Copy find verbatim from the source and output the full hide list again.\n' + why)
                    .catch(error => { if (error.isStop) throw error; console.warn(LOG, 'hide retry', error); return null; });
                const second = again && sortHide(again, byId, mode);
                if (second && (second.ok.length > ok.length || (second.ok.length === ok.length && second.bad.length < bad.length))) {
                    res = again;
                    ({ ok, bad } = second);
                }
            }
            if (!ok.length) {
                setAssetOff(job.chaId, true);
                await redrawChat().catch(error => console.warn(LOG, 'hide redraw', error));
                if (st.view?.chaId === job.chaId) st.view.hidden = true;
                hide.msg = { cls: 'warn', chaId: job.chaId, text: '정규식 · Lua 트리거에서 숨길 그림 자리를 찾지 못했습니다. 메시지 · 첫 메시지에 바로 쓴 에셋 그림({{img::…}} 등)만 화면에서 숨겼습니다.' };
                return;
            }
            hideStage(job, '봇에 저장하는 중', [0.95, 1]);
            if (job.stop) throw stopError();
            job.saving = true;
            const n = await saveHide(job, byId, ok);
            setAssetOff(job.chaId, true);
            await redrawChat().catch(error => console.warn(LOG, 'hide redraw', error));
            if (st.view?.chaId === job.chaId) st.view.hidden = true;
            const summary = String(res.summary ?? '').trim();
            hide.msg = {
                cls: 'ok', chaId: job.chaId,
                text: `그림 ${n}곳과 메시지에 바로 쓴 에셋 그림을 숨겼습니다.` + (summary ? ' ' + summary : '')
                    + (bad.length ? ` 모델이 고른 ${bad.length}곳은 원문과 맞지 않아 넣지 않았습니다.` : '')
                    + (mode === 'cut' ? ' 원문이 길어 Lua 트리거는 그림 줄만 보냈습니다.' : mode === 'none' ? ' 원문이 길어 Lua 트리거는 빼고 보냈고, Lua 속 그림은 그대로입니다.' : ''),
            };
        } catch (error) {
            hide.msg = error?.isStop
                ? { cls: 'warn', chaId: job.chaId, text: '취소했습니다. 봇은 바뀌지 않았습니다.' }
                : { cls: 'err', chaId: job.chaId, text: '숨기지 못했습니다: ' + (error?.message || error) };
            if (!error?.isStop) console.error(LOG, 'hide', error);
        } finally {
            clearInterval(job.tick);
            if (hide.job === job) hide.job = null;
            renderNow();
        }
    }

    async function saveHide(job, byId, ok) {
        const char = await api.getCharacterFromIndex(job.ci);
        if (!char || char.chaId !== job.chaId) throw new Error('그사이 봇이 바뀌어 저장하지 않았습니다.');
        const groups = new Map();
        for (const it of ok) groups.set(it.target, [...(groups.get(it.target) ?? []), it]);
        const backup = [];
        let n = 0;
        for (const [id, items] of groups) {
            const t = byId[id];
            const slot = hideSlot(char, t);

            if (!slot || slot.get() !== t.text) continue;
            backup.push({ id, label: t.label, comment: t.comment ?? '', text: t.text });
            slot.set(applyHide(t.text, items));
            n += items.length;
        }
        if (!n) throw new Error('그사이 봇의 정규식 · 트리거가 바뀌어 저장하지 않았습니다. 다시 눌러 주세요.');
        await api.setCharacterToIndex(job.ci, char);
        await save('nc:hide:' + job.chaId, { at: Date.now(), backup });
        return n;
    }

    async function runUnhide() {
        const v = st.view;
        if (!v || hide.job) return;
        hide.msg = null;
        try {
            const char = await api.getCharacterFromIndex(v.ci);
            if (!char || char.chaId !== v.chaId) throw new Error('봇을 읽지 못했습니다.');
            let n = 0;
            if (hasHide(char.backgroundHTML)) { char.backgroundHTML = unhide(char.backgroundHTML); n++; }
            for (const s of char.customscript ?? []) if (s && hasHide(s.out)) { s.out = unhide(s.out); n++; }
            for (const t of Array.isArray(char.triggerscript) ? char.triggerscript : []) {
                const fx = t?.effect?.[0];
                if (fx && hasHide(fx.code)) { fx.code = unhide(fx.code); n++; }
            }
            if (n) await api.setCharacterToIndex(v.ci, char);
            if (setAssetOff(v.chaId, false)) n++;
            v.hidden = false;
            await redrawChat().catch(error => console.warn(LOG, 'unhide redraw', error));
            hide.msg = { cls: 'ok', chaId: v.chaId, text: n ? '숨긴 그림을 다시 보이게 했습니다.' : '숨김 표식이 남아 있지 않아 바꿀 것이 없었습니다.' };
        } catch (error) {
            console.error(LOG, 'unhide', error);
            hide.msg = { cls: 'err', chaId: v.chaId, text: '되돌리지 못했습니다: ' + (error?.message || error) };
        }
        renderNow();
    }

    function hideButton() {
        const v = st.view;
        const job = hide.job;
        if (job && job.chaId === v.chaId) {
            const pct = (hideFrac(job) * 100).toFixed(1) + '%';
            return h('button', {
                class: 'ix-btn hb run', type: 'button', disabled: job.saving || job.stop, 'aria-busy': 'true',
                title: '한 번 더 누르면 취소합니다',
                onclick: () => {
                    if (job.saving || job.stop) return;
                    job.stop = true;
                    job.onStop();

                    const f = hideFrac(job);
                    hideStage(job, '취소하는 중', [f, f]);
                },
            }, h('span', { class: 'hb-fill', style: `width:${pct}` }), h('span', { class: 'hb-tx' }, job.label, job.saving || job.stop ? '' : h('small', null, '누르면 취소')));
        }
        if (job) return h('button', { class: 'ix-btn hb', type: 'button', disabled: true }, h('span', { class: 'hb-tx' }, '다른 봇의 그림을 숨기는 중입니다'));
        if (v.hidden) return h('button', { class: 'ix-btn hb done', type: 'button', onclick: runUnhide }, h('span', { class: 'hb-tx' }, '↩ 취소하기 (그림 다시 보이기)'));
        return h('button', { class: 'ix-btn hb', type: 'button', onclick: runHide }, h('span', { class: 'hb-tx' }, '🙈 이 봇의 그림 숨기기'));
    }

    const FONT = '"Pretendard","Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",sans-serif';
    const CSS = `
body.ix-on{margin:0;min-height:100vh;overflow-x:clip;color:#2b2f36;font:15px/1.55 ${FONT};padding:30px 16px 48px;box-sizing:border-box;background:rgba(0,0,0,.62)}
html:has(body.ix-on){background:transparent;overflow-y:scroll}
.ix{--paper:#fff;--paper2:#f6f7f9;--paper3:#eceef2;--line:#d5d9e0;--line2:#bfc5cf;--ink:#2b2f36;--muted:#6f7682;--accent:#3d5afe;--accent2:#2a3fc4;--soft:#eef1ff;--bad:#d0453b;--good:#1f8a4c;--ease-out:cubic-bezier(.2,.8,.2,1);
  position:relative;box-sizing:border-box;max-width:780px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr);min-width:0;color:var(--ink);font-family:${FONT};word-break:keep-all;overflow-wrap:anywhere;background:var(--paper);border:1px solid var(--line2);box-shadow:0 0 0 5px #fff,0 0 0 6px #ccc,0 34px 60px -34px rgba(0,0,0,.35)}
.ix *{box-sizing:border-box}
.ix [hidden]{display:none!important}
.ix button{font:inherit;color:inherit;cursor:pointer}
.ix h2,.ix h3,.ix p{margin:0}
.ix button:focus-visible,.ix input:focus-visible,.ix select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.ix-head{display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;min-height:52px;padding:6px 8px 6px 16px;font-size:.78rem;color:#fff;background:#23262d}
.ix-brand{display:flex;align-items:center;gap:4px 10px;flex:1 1 0;min-width:0}
.ix-logo{flex:none;display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:1rem;letter-spacing:.02em}
.hi{display:inline-flex;flex:none;width:16px;height:16px}
.hi svg{display:block;width:100%;height:100%}
.ix-logo .hi{width:18px;height:18px}
.ix-crumb{min-width:0;overflow:hidden;opacity:.75;font-size:.84rem;white-space:nowrap;text-overflow:ellipsis}
.ix-chip{flex:none;padding:1px 7px;font-size:.72rem;font-weight:700;color:#d6d9df;background:#3a3e47}
.ix-chip.run{color:#fff;background:var(--accent)}
.ix-chip.ok{color:#fff;background:var(--good)}
.ix-chip.bad{color:#fff;background:var(--bad)}
.ix .ix-x{flex:none;display:grid;place-items:center;width:28px;height:28px;padding:0;font-size:1.1rem;line-height:1;color:#fff;background:#d0453b;border:1px solid #e0675e}
.ix .ix-x:hover{background:#b3362d}
.ix-nav{display:flex;align-items:stretch;gap:0;min-width:0;padding:0 8px;overflow-x:auto;background:var(--paper2);border-bottom:1px solid var(--line);scrollbar-width:none}
.ix-tabs{display:flex;align-items:stretch;flex:none}
.ix-nav>.an-c{flex:none;align-self:center;margin:0 0 0 auto}
.ix .ix-tab{flex:none;display:inline-flex;align-items:center;min-width:0;height:40px;padding:0 14px;white-space:nowrap;font-size:.88rem;color:var(--muted);background:transparent;border:0;border-bottom:3px solid transparent;margin-bottom:-1px}
.ix .ix-tab:hover{color:var(--ink);background:var(--paper3)}
.ix .ix-tab.on{font-weight:700;color:var(--accent2);border-bottom-color:var(--accent);background:transparent}
.ix-pane{min-width:0;padding:16px}
.ix-pane.anim>*{animation:ix-rise .5s var(--ease-out) backwards}
.ix-pane.anim>:nth-child(2){animation-delay:.05s}
.ix-pane.anim>:nth-child(3){animation-delay:.1s}
.ix-pane.anim>:nth-child(4){animation-delay:.15s}
.ix-pane.anim>:nth-child(5){animation-delay:.2s}
.ix-pane.anim>:nth-child(6){animation-delay:.25s}
.ix-pane.anim>:nth-child(7){animation-delay:.3s}
.ix-pane.anim>:nth-child(8){animation-delay:.35s}
.ix-pane.anim>:nth-child(9){animation-delay:.4s}
.ix-pane.anim>:nth-child(n+10){animation-delay:.45s}
@keyframes ix-rise{from{opacity:0;transform:translateY(10px)}}
.ix-hint{font-size:.76rem;color:var(--muted)}
.ix .ix-intro{margin:0 0 34px;padding:7px 12px;font-size:.8rem;line-height:1.5;color:var(--ink);background:var(--paper2);border-left:3px solid var(--line2)}
.ix-intro b{margin-right:6px}
.ix-acts{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin:12px 0 4px}
.ix-btn{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-height:32px;padding:5px 14px;font-size:.84rem;line-height:1.4;color:var(--ink);background:#fff;border:1px solid var(--line2);white-space:nowrap;transition:background .15s,border-color .15s}
.ix-btn:hover:not(:disabled){background:var(--paper2);border-color:#9aa1ad}
.ix-btn:disabled{opacity:.45;cursor:not-allowed}
.ix-btn.main{color:#fff;font-weight:700;background:var(--accent);border-color:var(--accent2)}
.ix-btn.main:hover:not(:disabled){background:var(--accent2)}
.ix-btn.big{width:100%;min-height:48px;font-size:1rem}
.ix-btn.sm{min-height:28px;padding:3px 10px;font-size:.78rem}
.ix-btn.warn{color:var(--bad);border-color:#e6b4b0}
.ix-btn.warn:hover:not(:disabled){background:#fff5f4;border-color:var(--bad)}
.ix-btn.warn.armed,.ix-btn.warn.armed:hover:not(:disabled){color:#fff;font-weight:700;background:var(--bad);border-color:var(--bad)}
/* 기다리는 동안 버튼 안을 왼쪽부터 채우는 게이지 (2.18.0: 태그 재생성). 끝을 모르는 요청이라 92% 까지 느려지며 찬다 */
.ix-btn.run{position:relative;overflow:hidden;isolation:isolate}
.ix-btn.run:disabled{opacity:1;cursor:progress}
.ix-btn.run .gf{position:absolute;left:0;top:0;bottom:0;z-index:-1;background:#c9d2ff;animation:ix-fill 14s cubic-bezier(.15,.6,.35,1) both}
.ix-msg{margin:10px 0 0;padding:8px 12px;font-size:.8rem;background:#fff;border:1px solid var(--line);border-left:4px solid var(--accent)}
.ix-msg.err{color:#8d2a22;border-left-color:var(--bad);background:#fff7f6}
.ix-msg.ok{border-left-color:var(--good)}
.ix-empty{margin-top:12px;padding:28px 16px;text-align:center;font-size:.86rem;color:var(--muted);background:var(--paper2);border:1px dashed var(--line2)}
.ix-empty b{display:block;margin-bottom:6px;font-size:1.05rem;color:var(--ink)}
.ix-open-bar{position:relative;max-width:280px;height:20px;margin:14px auto 0;overflow:hidden;background:var(--paper3);border:1px solid var(--line)}
.ix-open-bar .fi{position:relative;width:90%;height:100%;overflow:hidden;background:linear-gradient(90deg,var(--accent2),var(--accent));animation:ix-open 8s cubic-bezier(.15,.6,.35,1) both}
.ix-open-bar .fi::after,.pg-bar .fi::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 20%,rgba(255,255,255,.45) 50%,transparent 80%);transform:translateX(-100%);animation:ix-shine 1.6s ease-in-out infinite}
@keyframes ix-open{from{width:4%}to{width:90%}}
/* 여는 중 팁 (3.12.0): 한 줄 높이 칸에 겹쳐 두고 차례로 나타났다 사라진다. 팁 수를 바꾸면 ix-tip 의 18% · 20%(= 1/팁 수)도 맞춰 바꾼다 */
.ix-tip{display:flex;align-items:center;gap:6px;max-width:340px;margin:12px auto 0;font-size:.76rem;color:var(--muted)}
.ix-tip b{display:inline;flex:none;margin:0;padding:0 5px;font-size:.62rem;line-height:1.6;letter-spacing:.04em;color:#fff;background:var(--accent)}
.ix-tip-box{position:relative;flex:1;min-width:0;height:1.6em;overflow:hidden;text-align:left}
.ix-tip-box span{position:absolute;inset:0;line-height:1.6em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:0;animation:ix-tip 22.5s linear infinite}
@keyframes ix-tip{0%{opacity:0;transform:translateY(60%)}2%,18%{opacity:1;transform:none}20%,100%{opacity:0;transform:translateY(-60%)}}
@media (prefers-reduced-motion:reduce){.ix-tip-box span{animation-name:ix-tip-fade}}
@keyframes ix-tip-fade{0%{opacity:0}2%,18%{opacity:1}20%,100%{opacity:0}}
@keyframes ix-shine{to{transform:translateX(100%)}}
@keyframes ix-fill{from{width:4%}to{width:92%}}
/* 진행 막대 — 연출 · 그리기 · 저장 세 구간 */
.pg{margin-top:12px;padding:12px 14px;background:var(--paper2);border:1px solid var(--line)}
.pg-now{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin-bottom:8px;font-size:.84rem;font-weight:700}
.pg-now span{flex:1 1 auto}
.pg-bar,.pg-nm{display:grid;grid-template-columns:3fr 4fr 1fr;gap:4px}
.pg-bar .seg{position:relative;height:8px;overflow:hidden;background:var(--paper3)}
.pg-bar .seg.done{background:var(--good)}
.pg-bar .fi{position:relative;height:100%;overflow:hidden;background:var(--accent);animation:ix-fill 40s cubic-bezier(.15,.6,.35,1) both}
.pg-nm{margin-top:5px;font-size:.7rem;color:var(--muted)}
.pg-nm .done{color:var(--good);font-weight:700}
.pg-nm .cur{color:var(--accent2);font-weight:700}
.sub{display:flex;align-items:center;gap:10px;margin:22px 0 10px;font-size:.9rem;font-weight:700;color:var(--ink)}
.sub:first-child{margin-top:0}
.sub small{font-weight:400;font-size:.74rem;color:var(--muted)}
.sub::before,.cf-grp>h2::before{content:"";flex:none;width:7px;height:7px;background:var(--accent);transform:rotate(45deg)}
/* 메시지 고르기 줄 */
.kind-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:10px}
.pick{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:10px}
.pick select{flex:1 1 260px;min-width:0;min-height:32px;padding:4px 8px;font:inherit;font-size:.8rem;color:var(--ink);background:#fff;border:1px solid var(--line2);border-radius:0}
/* 만화 기록 */
.gl{display:grid;gap:12px}
.gc{background:#fff;border:1px solid var(--line)}
.gc-hd{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;padding:9px 12px;border-bottom:1px solid var(--line);background:var(--paper2)}
.gc-hd b{font-size:.88rem}
.gc-hd span{flex:1 1 200px;min-width:0;font-size:.74rem;color:var(--muted)}
.gc-imgs{display:flex;gap:8px;padding:10px 12px;overflow-x:auto}
.gc-imgs button{flex:none;padding:0;background:#1e2127;border:1px solid var(--line2);line-height:0}
.gc-imgs img{display:block;height:220px;width:auto;min-width:80px}
.gc-acts{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 10px}
.pv{margin:0 12px 12px;padding:10px;background:var(--paper2);border:1px solid var(--line)}
.pv h3{margin:8px 0 4px;font-size:.76rem;color:var(--muted)}
.pv h3:first-child{margin-top:0}
.pv .cf-ta{min-height:120px;font-family:ui-monospace,Consolas,monospace;font-size:.74rem}
.pv-slot{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px;align-items:start}
.pv-slot .xy{display:flex;gap:4px}
.pv-slot .cf-num{width:58px}
.co-wrap{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:flex-start}
.co-pl{position:relative;display:grid;grid-template-columns:repeat(5,34px);grid-template-rows:repeat(5,34px);gap:2px;padding:2px;background:#1d1d22;border:2px solid #666}
.co-c{display:flex;align-items:center;justify-content:center;padding:0;background:#2a2a31;border:0;border-radius:0;cursor:pointer}
.co-c:hover:not(:disabled){background:#3a3a44}
.co-c:disabled{cursor:default}
.co-d{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;font:700 11px/1 sans-serif;font-style:normal;color:#000}
.co-c .co-d+.co-d{margin-left:-7px}
.co-ct{position:absolute;inset:0;display:grid;place-items:center;font-size:.76rem;color:#aaa;pointer-events:none}
.co-side{display:flex;flex-direction:column;gap:6px;flex:1 1 180px;min-width:0}
.co-chip{display:flex;align-items:center;gap:6px;min-height:30px;padding:3px 10px 3px 5px;font:inherit;font-size:.8rem;text-align:left;color:var(--ink);background:#fff;border:1px solid var(--line2);border-radius:0}
.co-chip.on{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)}
.co-chip:disabled{color:var(--muted);cursor:default}
/* 큰 그림 보기 */
/* 3.22.0: 그리드 칸 안의 max-height:100% 는 칸 높이를 따라 늘어나 그림이 화면 아래로 잘렸다. 창 크기(vw · vh)로 직접 막는다 */
.lb{position:fixed;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px;background:rgba(0,0,0,.88);cursor:zoom-out}
.lb img{display:block;width:auto;height:auto;max-width:calc(100vw - 32px);max-height:calc(100vh - 64px);max-height:calc(100dvh - 64px);object-fit:contain;box-shadow:0 10px 40px rgba(0,0,0,.6)}
.lb-tip{font-size:.76rem;color:#c7cdd6}
.lb-x{position:absolute;top:10px;right:10px;width:38px;height:38px;padding:0;font-size:1.2rem;line-height:1;color:#fff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.35);cursor:pointer}
.lb-x:hover{background:rgba(255,255,255,.25)}
/* 캐릭터 카드 — 접힌 머리줄로 한 사람씩 구분하고, 누르면 펼쳐 고친다. 왼쪽 띠 · 동그라미 색이 그 사람의 색이다 */
.cc{background:#fff;border:1px solid var(--line);border-left:4px solid var(--cc,var(--accent))}
.cc+.cc{margin-top:12px}
.cc-hd{display:flex;align-items:center;gap:10px;padding:10px 12px;cursor:pointer;user-select:none}
.cc-hd:hover{background:var(--paper2)}
.cc-hd:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.cc.open>.cc-hd{background:var(--paper2);border-bottom:1px solid var(--line)}
.cc-av{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;font-weight:700;font-size:.95rem;color:#fff;background:var(--cc,var(--accent))}
.cc-ti{flex:1 1 auto;display:grid;gap:2px;min-width:0}
.cc-ti b{display:flex;align-items:center;gap:6px;min-width:0;font-size:.92rem;color:var(--ink)}
.cc-nm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cc-sx{flex:none;padding:0 5px;font-size:.7rem;font-weight:700;color:var(--cc,var(--accent));border:1px solid currentColor}
.cc-sum{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.74rem;color:var(--muted)}
.cc-chg{flex:none;padding:1px 6px;font-size:.7rem;font-weight:700;color:var(--accent2);background:var(--soft);border:1px solid var(--accent)}
.cc-sw{flex:none}
.cc-cv{flex:none;font-size:.8rem;color:var(--muted);transition:transform .2s var(--ease-out)}
.cc.open .cc-cv{transform:rotate(180deg)}
.cc-src{flex:none;padding:1px 6px;font-size:.66rem;font-weight:400;color:#fff;background:#6f7682}
.cc-src.persona{background:#8a5cd0}
.cc-src.lore{background:var(--accent)}
.cc-src.chat{background:#c27a12}
.cc-src.edit{background:var(--good)}
.cc-sec{display:grid;gap:6px;padding:12px 14px}
.cc-sec+.cc-sec{border-top:1px solid var(--paper3)}
.cc-sec h4{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px;margin:0;white-space:nowrap;font-size:.78rem;font-weight:700;color:var(--ink)}
.cc-sec h4 small{white-space:normal;font-size:.7rem;font-weight:400;color:var(--muted)}
.cc-sec label{display:grid;gap:3px;font-size:.74rem;color:var(--muted)}
.cc-sec .cf-ta{min-height:52px;font-size:.8rem}
.cc-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.cc-row .cf-in{font-weight:700}
.cc-ft{display:flex;justify-content:flex-end;padding:8px 14px;background:var(--paper2);border-top:1px solid var(--paper3)}
.cc-tags{padding:6px 8px;font:.72rem/1.5 ui-monospace,Consolas,monospace;color:#3a3f48;background:var(--paper2);border:1px dashed var(--line2);word-break:break-all}
.cc.off .cc-av,.cc.off .cc-ti{opacity:.5}
.cc-all{margin-left:auto}
.state-row{display:flex;flex-wrap:wrap;gap:8px 16px;padding:10px 12px;font-size:.8rem;background:var(--soft);border:1px solid color-mix(in srgb,var(--accent) 30%,var(--line))}
.st-f{display:flex;align-items:center;gap:6px;flex:1 1 200px;min-width:0;white-space:nowrap}
.st-f .cf-in{flex:1 1 auto;min-height:32px}
.state-row>.ix-hint{flex:1 1 100%}
/* 이 봇의 그림 숨기기: 버튼 안에서 왼쪽부터 게이지가 찬다 */
.ix-btn.hb{position:relative;overflow:hidden;width:100%;min-height:42px;font-size:.88rem}
.ix-btn.hb.run{border-color:var(--accent)}
.ix-btn.hb.run:disabled{opacity:1;cursor:progress}
.ix-btn.hb.done{color:var(--accent2);font-weight:700;border-color:var(--accent)}
.hb-fill{position:absolute;left:0;top:0;bottom:0;width:0;background:color-mix(in srgb,var(--accent) 26%,#fff);transition:width .2s linear}
.hb-tx{position:relative;display:inline-flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:2px 8px;white-space:normal}
.hb-tx small{font-size:.74rem;color:var(--muted)}
/* 작가 */
.ps{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:8px}
.ps-it{position:relative;display:flex;flex-direction:column;gap:4px;min-width:0;width:100%;padding:6px 6px 8px;overflow:hidden;text-align:left;background:#fff;border:1px solid var(--line2)}
.ps-it::before{content:"";position:absolute;top:11px;left:11px;z-index:1;width:14px;height:14px;border-radius:50%;border:2px solid var(--line2);background:#fff}
.ps-th{display:grid;place-items:center;width:100%;aspect-ratio:2/3;overflow:hidden;background:var(--paper2);border:1px solid var(--line)}
.ps-th img{display:block;width:100%;height:100%;object-fit:cover;object-position:top}
.ps-none{padding:8px;font-size:.7rem;font-style:normal;line-height:1.5;text-align:center;color:var(--muted)}
.ps-it.sel{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)}
.ps-it.sel::before{border-color:var(--accent);background:radial-gradient(circle,var(--accent) 0 3px,#fff 3.5px)}
.ps-it b{padding:0 2px;font-size:.86rem;line-height:1.35;white-space:normal;word-break:keep-all;overflow-wrap:anywhere}
.ps-it span{display:-webkit-box;padding:0 2px;overflow:hidden;font-size:.7rem;line-height:1.4;color:var(--muted);white-space:normal;overflow-wrap:anywhere;-webkit-box-orient:vertical;-webkit-line-clamp:3}
.ed{display:grid;gap:8px;margin-top:12px;padding:12px;background:#fff;border:1px solid var(--line)}
.ed label{display:grid;gap:3px;font-size:.76rem;color:var(--muted)}
.ed input{padding:6px 8px;font:inherit;font-size:.86rem;border:1px solid var(--line2)}
.ed .cf-ta{min-height:120px;font-family:ui-monospace,Consolas,monospace;font-size:.76rem}
/* 설정 */
.cf-ta{width:100%;min-height:84px;padding:8px 10px;font:inherit;font-size:.82rem;line-height:1.6;color:var(--ink);background:#fff;border:1px solid var(--line2);resize:vertical}
.cf-ta:focus,.cf-num:focus,.cf-in:focus{outline:none;border-color:var(--accent)}
.cf-ta:disabled{background:#e9ebef;color:#8a909a;border-color:#d5d9e0;cursor:not-allowed}
.cf-num{width:90px;min-height:34px;padding:5px 8px;font:inherit;font-size:.82rem;text-align:right;color:var(--ink);background:#fff;border:1px solid var(--line2)}
.cf-in{flex:1 1 220px;min-width:0;min-height:36px;padding:5px 9px;font:inherit;font-size:.84rem;color:var(--ink);background:#fff;border:1px solid var(--line2)}
.cf-grp{margin-top:22px}
.cf-dev{display:flex;align-items:center;gap:12px;margin-top:22px;padding:10px 14px;color:#e8ebf1;background:#141c2e;border:1px solid #141c2e}
.cf-dev-gh{flex:none;display:flex;width:24px;height:24px;color:#fff}
.cf-dev-gh svg{width:100%;height:100%;fill:currentColor}
.cf-dev-tx{flex:1 1 0;min-width:0;line-height:1.35}
.cf-dev-tx small{display:inline;margin-right:6px;font-size:.66rem;letter-spacing:.08em;color:#9aa4b6}
.cf-dev-tx b{display:inline;font-size:.92rem;color:#fff;user-select:text}
.cf-dev-tx span{display:block;margin-top:1px;font-size:.72rem;line-height:1.45;color:#b9c1cf}
.cf-dev-tx .cf-dev-msg{color:#ffd27a}
.cf-dev-tx .cf-dev-msg:empty{display:none}
.ix .cf-dev-go{flex:none;padding:5px 11px;font-size:.76rem;color:#fff;background:transparent;border:1px solid #c7cdd6}
.ix .cf-dev-go:hover{background:#22304d}
@media (max-width:520px){.cf-dev{flex-wrap:wrap}.ix .cf-dev-go{width:100%}}
.cf-grp:first-child{margin-top:0}
.cf-grp>h2{display:flex;align-items:center;gap:10px;margin:0 0 8px;padding-left:2px;font-size:1rem;font-weight:700;color:var(--ink)}
.cf-card{background:#fff;border:1px solid var(--line)}
.cf-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;padding:13px 14px;border-top:1px solid var(--line)}
.cf-row:first-child{border-top:0}
.cf-row.sw{flex-wrap:nowrap}
.cf-row.col{flex-direction:column;align-items:stretch}
.cf-tx{display:block;flex:1 1 250px;min-width:0}
.cf-row.sw .cf-tx{flex:1 1 0}
.cf-row.col .cf-tx{flex:none}
.cf-tx>b{display:block;font-size:.9rem;line-height:1.4}
.cf-tx p{margin:3px 0 0;font-size:.76rem;line-height:1.6;color:var(--muted)}
.cf-key{display:flex;flex-wrap:wrap;gap:8px;width:100%}
.cf-tg{flex:none;display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:0 2px;background:none;border:0}
.cf-tg-lb{min-width:2.4em;font-size:.8rem;color:var(--muted);text-align:right}
.cf-tg-tr{position:relative;width:46px;height:26px;background:var(--line2);border-radius:13px;transition:background .15s}
.cf-tg-tr i{position:absolute;top:3px;left:3px;width:20px;height:20px;background:#fff;border-radius:50%;box-shadow:0 1px 2px rgba(0,0,0,.3);transition:left .15s}
.cf-tg.on .cf-tg-lb{font-weight:700;color:var(--accent2)}
.cf-tg.on .cf-tg-tr{background:var(--accent)}
.cf-tg.on .cf-tg-tr i{left:23px}
.cf-seg{flex:none;display:inline-flex;flex-wrap:wrap;max-width:100%;border:1px solid var(--line2)}
.cf-row.col>.cf-seg{align-self:flex-start}
.cf-seg button{flex:1 1 auto;min-height:36px;padding:0 13px;font-size:.82rem;color:var(--ink);background:#fff;border:0;border-left:1px solid var(--line2);white-space:nowrap}
.cf-seg button:first-child{border-left:0}
.cf-seg button:hover:not(:disabled):not(.sel){color:var(--accent2);background:var(--soft)}
.cf-seg button.sel{font-weight:700;color:#fff;background:var(--accent)}
.cf-pickbox{display:flex;flex-wrap:wrap;align-items:center;gap:8px;max-width:100%}
.cf-ownbox{display:inline-flex;align-items:center;gap:5px;font-size:.78rem;color:var(--muted)}
.cf-ownbox .cf-num{width:84px}
.cf-ownbox{max-width:100%}
.cf-ownbox .cf-num.cf-mid{width:250px;max-width:100%;text-align:left}
.cf-ownbox .cf-num.sel{color:#fff;font-weight:700;background:var(--accent);border-color:var(--accent)}
.cf-ownbox .cf-num.sel::placeholder{color:rgba(255,255,255,.7)}
.cf-nums{display:flex;flex-wrap:wrap;gap:8px 14px}
.cf-nums label{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;color:var(--muted)}
.cf-row.cf-subrow{padding:8px 14px 8px 28px;background:var(--paper2);border-top-style:dashed}
.cf-row.cf-subrow .cf-tx>b{font-size:.84rem}
.cf-row.cf-subrow .cf-tx p{margin-top:1px}
.cf-row.cf-subrow.off{opacity:.45}
.cf-stp{flex:none;display:inline-flex;align-items:stretch;border:1px solid var(--line2);background:#fff}
.cf-stp button{width:32px;min-height:32px;padding:0;font-size:1rem;color:var(--ink);background:#fff;border:0}
.cf-stp button:hover:not(:disabled){color:var(--accent2);background:var(--soft)}
.cf-stp button:disabled{color:var(--line2);cursor:default}
.cf-stp .cf-num{width:44px;min-height:32px;padding:4px;text-align:center;border:0;border-left:1px solid var(--line2);border-right:1px solid var(--line2)}
.ix-foot{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 12px;padding:10px 16px 12px;border-top:1px solid var(--line);font-size:.72rem;color:var(--muted);background:var(--paper2)}
.ix .lnk{padding:0;font-size:.76rem;color:var(--accent2);background:none;border:0;text-decoration:underline;cursor:pointer}
.ix-under{margin-top:8px}
.ix-set>.cf-grp:first-child{margin-top:0}
.sz-bar{position:sticky;bottom:0;z-index:5;display:flex;align-items:center;margin:16px -16px -16px;padding:10px 16px;background:rgba(255,255,255,.97);border-top:1px solid var(--line2);box-shadow:0 -10px 18px -14px rgba(0,0,0,.35)}
.sz-tx{font-size:.78rem;line-height:1.5;color:var(--muted)}
.sz-tx.wait{color:var(--bad)}
.sz-tx.ok{color:var(--good);font-weight:700}
.sz-tx.warn{color:#9a6200}
.sz-tx.err{color:var(--bad);font-weight:700}
.sp{position:relative;padding:0 0 20px 38px}
.sp::before{content:"";position:absolute;left:12px;top:30px;bottom:4px;width:2px;background:var(--line)}
.sp.end{padding-bottom:4px}
.sp.end::before{display:none}
.sp.done::before{background:var(--good)}
/* 3.61.0: 번호 원은 왼쪽에 띄우고 머리줄은 본문과 같은 38px 에서 시작한다. 긴 요약이 줄을 바꿔도 단계 선 위로 넘치지 않는다 */
.sp-hd{position:relative;display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px;min-height:26px;margin-left:-38px;padding-left:38px}
.sp-n{position:absolute;left:0;top:0;display:grid;place-items:center;flex:none;width:26px;height:26px;border-radius:50%;font-size:.8rem;font-weight:700;color:var(--muted);background:#fff;border:2px solid var(--line2)}
.sp.cur .sp-n{color:#fff;background:var(--accent);border-color:var(--accent)}
.sp.done .sp-n{color:#fff;background:var(--good);border-color:var(--good)}
.sp-hd b{font-size:.95rem}
.sp.lock .sp-hd b{color:var(--muted)}
.sp.lock .sp-hd{opacity:.75}
.sp-hd .lnk{margin-left:2px}
.sp-sum{min-width:0;overflow-wrap:anywhere;font-size:.78rem;color:var(--muted)}
.sp.done .sp-sum{color:var(--good);font-weight:700}
.sp-bd{padding-top:10px}
.sp-bd:empty{display:none}
.sp.lock .sp-bd{padding-top:4px}
.sp-bd>.ix-msg:first-child,.sp-bd>.ix-acts:first-child{margin-top:0}
.dz{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.dz-op{display:flex;flex-direction:column;align-items:stretch;padding:0;text-align:left;background:#fff;border:1px solid var(--line2);transition:border-color .15s,box-shadow .15s}
.dz-op:hover:not(:disabled){border-color:#9aa1ad}
.dz-op.sel{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)}
.dz-th{display:grid;place-items:center;height:118px;font-size:2.6rem;background:#1e2127;border-bottom:1px solid var(--line)}
.dz-tx{flex:1 1 auto;display:grid;align-content:start;gap:3px;min-width:0;padding:9px 11px 11px}
.dz-tx b{display:flex;align-items:center;gap:7px;font-size:.88rem}
.dz-tx b::before{content:"";flex:none;width:14px;height:14px;border-radius:50%;border:2px solid var(--line2);background:#fff}
.dz-op.sel .dz-tx b::before{border-color:var(--accent);background:radial-gradient(circle,var(--accent) 0 3px,#fff 3.5px)}
.dz-tx span{font-size:.74rem;color:var(--muted)}
.ab{position:sticky;bottom:0;z-index:5;display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:16px -16px -16px;padding:10px 16px;background:rgba(255,255,255,.97);border-top:1px solid var(--line2);box-shadow:0 -10px 18px -14px rgba(0,0,0,.35)}
.ab-tx{display:flex;align-items:center;gap:6px;flex:1 1 220px;font-size:.76rem;color:var(--muted)}
.ab-tx.ok{color:var(--good);font-weight:700}.ab-tx.err{color:var(--bad);font-weight:700}.ab-tx.wait{color:var(--accent2);font-weight:700}
.rz{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin-top:22px;padding:12px 14px;background:#fffafa;border:1px solid #efcfcc}
.rz-tx{flex:1 1 240px;display:grid;gap:2px;min-width:0}
.rz-tx b{font-size:.88rem;color:var(--bad)}
.rz-tx span{font-size:.74rem;color:var(--muted)}
.cf-warn{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin-bottom:12px;padding:11px 14px;font-size:.86rem;font-weight:700;background:var(--soft);border:1px solid var(--line2)}
.cf-tx details{margin-top:2px;font-size:.76rem;color:var(--muted)}
.cf-tx summary{width:max-content;color:var(--accent);cursor:pointer;list-style:none}
.cf-tx summary::-webkit-details-marker{display:none}
.cf-tx summary::after{content:" ▾"}
.cf-tx details[open] summary::after{content:" ▴"}
.cf-tx details p{margin:2px 0 0;font-size:1em}
.ok-tx{font-size:.76rem;font-weight:700;color:var(--good)}
.bad-tx{font-size:.76rem;font-weight:700;color:var(--bad)}
.raw-box{margin:6px 0 0;font-size:.74rem;color:var(--muted)}
.ans .raw-box{margin:0 12px 12px}
.raw-box summary{width:max-content;color:var(--accent);cursor:pointer}
.raw-box pre{max-height:220px;overflow:auto;margin:4px 0 0;padding:6px 8px;font:.72rem/1.45 ui-monospace,Consolas,monospace;white-space:pre-wrap;word-break:break-all;color:var(--ink);background:var(--paper3);border:1px solid var(--line)}
.ix code{font:.72rem ui-monospace,Consolas,monospace;background:var(--paper3);padding:0 3px}
.no{flex:none;padding:1px 7px;font-size:.72rem;font-weight:700;color:#fff;background:#3a3e47}
.no.new{background:var(--accent)}
.ix-tab .cnt{margin-left:5px;padding:0 5px;font-style:normal;font-size:.7rem;font-weight:700;color:var(--muted);background:var(--paper3)}
.ix-tab.on .cnt{color:var(--accent2);background:var(--soft)}
.ix .ix-nav.as .ix-tab.on{color:#0b766c;border-bottom-color:#0d9488}
.ix-nav.as .ix-tab.on .cnt{color:#0b766c;background:#e6f6f4}
.gal-top{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-bottom:10px}
.gal-top .ix-hint{flex:1 1 200px}
.ans{background:#fff;border:1px solid var(--line)}
.ans+.ans{margin-top:10px}
.ans.on{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)}
.ans-h{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;padding:10px 12px 0}
.ans-st{font-size:.72rem;color:var(--muted)}
.ans-st.has{color:var(--good);font-weight:700}
.ans.gone .no{color:var(--muted)}
.ans-tx{display:-webkit-box;margin:4px 12px 0;overflow:hidden;font-size:.8rem;color:var(--muted);-webkit-line-clamp:2;-webkit-box-orient:vertical}
.ans-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px;padding:10px 12px 0}
.ans .menu{position:static;margin:8px 12px 0;min-width:0;box-shadow:none}
.ans-pv{padding:0 12px}
.ans-f{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;padding:10px 12px 12px}
.ans-f .ix-hint{margin-left:auto}
.menu-h{padding:6px 12px;font-size:.72rem;font-weight:700;color:var(--muted);background:var(--paper2);border-bottom:1px solid var(--line)}
.menu-h+button{border-top:0}
.pv-h{display:flex;align-items:flex-start;gap:10px;margin:0 0 10px;padding:0 0 10px;border-bottom:1px solid var(--line)}
.pv-h>div{flex:1 1 auto;display:grid;gap:2px;min-width:0}
.pv-h b{font-size:.86rem}
.pv-h span{font-size:.74rem;color:var(--muted)}
.pv .pv-n{margin-top:14px;font-size:.8rem;color:var(--ink)}
.tile .im{position:relative}
.tile .im::after{content:"🔍 크게 보기";position:absolute;right:4px;bottom:4px;padding:2px 6px;font-size:.66rem;line-height:1.4;color:#fff;background:rgba(0,0,0,.6);opacity:0;transition:opacity .15s}
.tile .im:hover::after,.tile .im:focus-visible::after{opacity:1}
.ans-f .pg{flex:1 1 100%}
.gal-empty{padding:18px 12px;text-align:center;font-size:.82rem;color:var(--muted);background:var(--paper2);border:1px dashed var(--line2)}
.tile{position:relative;display:grid;background:#fff;border:1px solid var(--line2)}
.tile .im{display:block;padding:0;line-height:0;background:#1e2127;border:0;cursor:zoom-in}
.tile img{width:100%;aspect-ratio:2/3;object-fit:cover;object-position:top}
.tile .cap{display:flex;align-items:flex-start;gap:4px;padding:6px 2px 6px 8px;border-top:1px solid var(--line)}
.tile .cap div{flex:1 1 auto;display:grid;min-width:0}
.tile .cap b{overflow:hidden;font-size:.76rem;white-space:nowrap;text-overflow:ellipsis}
.tile .cap span{font-size:.7rem;color:var(--muted)}
.tile .more{flex:none;width:30px;height:30px;padding:0;font-size:1rem;line-height:1;color:var(--muted);background:none;border:1px solid transparent}
.tile .more:hover,.tile .more.on{color:var(--ink);background:var(--paper2);border-color:var(--line2)}
.menu{display:grid;background:#fff;border:1px solid var(--line2)}
.menu button{display:grid;gap:0;padding:8px 12px;text-align:left;font-size:.82rem;background:#fff;border:0;border-top:1px solid var(--line)}
.menu button:first-child{border-top:0}
.menu button:hover:not(:disabled){background:var(--soft)}
.menu button:disabled{opacity:.45;cursor:not-allowed}
.menu small{font-size:.7rem;color:var(--muted)}
.menu .del{color:var(--bad)}
.menu .del.armed{color:#fff;font-weight:700;background:var(--bad)}
.menu .del.armed small{color:#ffe1de}
.ix-msg.ok-box{color:#17603a;border-left-color:var(--good);background:#f3faf5}
.wd{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(0,1fr);gap:6px 8px;align-items:center}
.wd-h{font-size:.72rem;font-weight:700;color:var(--muted)}
.wd-h.now{color:var(--accent2)}
.wd-l{font-size:.76rem;font-weight:700;color:var(--ink);white-space:nowrap}
.wd-g{grid-column:1/-1;margin-top:6px;padding-bottom:2px;font-size:.7rem;font-weight:700;color:var(--cc,var(--accent));border-bottom:1px solid var(--paper3)}
.wd-h+.wd-g{margin-top:0}
.wd .cf-in{min-width:0;width:100%}
.wd .cf-in.now{border-style:dashed}
.wd .cf-in.now.on{border-style:solid;border-color:var(--accent);background:var(--soft)}
@media (max-width:600px){
  body.ix-on{padding:22px 10px 36px}
  .cc-hd{gap:8px;padding:10px}
  .cc-sw .cf-tg-lb,.cc-ti .cc-src{display:none}
  .cc-sec{padding:10px}
  .ix-pane{padding:12px}
  .sz-bar{margin:16px -12px -12px;padding:10px 12px}
  .ix-nav{padding:0 4px}
  .ix .ix-tab{flex:1 1 0;justify-content:center;padding:0 6px}
  .gc-imgs img{height:180px}
  .cf-row.sw{flex-wrap:wrap}
  .sp{padding-left:34px}
  .sp-hd{margin-left:-34px;padding-left:34px}
  .ab{margin:16px -12px -12px;padding:10px 12px}
  .ans-g{grid-template-columns:repeat(3,minmax(0,1fr))}
}
@media (max-width:420px){
  .ix-btn{padding:5px 10px;font-size:.8rem}
  .ix-btn.big{font-size:.95rem}
  .cf-seg button{padding:0 9px}
  .ix .ix-tab{padding:0 2px;font-size:.82rem}
  .ix-tab .lg{display:none}
  .ix-tab .cnt{margin-left:2px;padding:0 4px}
  .dz{grid-template-columns:1fr}
  .dz-op{flex-direction:row}
  .dz-th{flex:none;width:96px;height:auto;min-height:96px;border-bottom:0;border-right:1px solid var(--line)}
  .ans-g{grid-template-columns:repeat(2,minmax(0,1fr))}
  .wd{gap:5px 6px}
  .wd .cf-in{padding-left:6px;padding-right:6px;font-size:.78rem}
}
`;

    function h(tag, props, ...children) {
        const el = doc.createElement(tag);
        for (const [key, value] of Object.entries(props ?? {})) {
            if (value == null || value === false) continue;
            if (key === 'class') el.className = value;
            else if (key === 'style') el.style.cssText = value;
            else if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
            else if (key === 'disabled' || key === 'checked' || key === 'selected') el[key] = true;
            else if (key === 'value') el.value = String(value);
            else el.setAttribute(key, String(value));
        }
        for (const child of children.flat(Infinity)) {
            if (child == null || child === false || child === '') continue;
            el.append(typeof child === 'object' ? child : String(child));
        }
        return el;
    }

    function add(el, ...children) {
        for (const child of children.flat(Infinity)) {
            if (child == null || child === false || child === '') continue;
            el.append(typeof child === 'object' ? child : String(child));
        }
        return el;
    }

    const ui = { root: null, mode: 'imagine', tab: 'ready', atab: 'make', side: '', lastTab: null, reopen: 0, galFilter: 'all', menu: '', galLimit: 30 };

    const galCount = () => { const v = st.view; return v ? Object.values(v.recs).filter(r => r.chat === v.chatKey).reduce((n, r) => n + (r.images?.length ?? 0), 0) : 0; };
    const TABS = [
        ['ready', () => ['준비', st.view?.hasKey && setupDone() ? h('em', { class: 'cnt' }, '✓') : null]],

        ['gallery', () => ['삽화 목록', galCount() ? h('em', { class: 'cnt' }, galCount()) : null]],
    ];

    const SIDE_TABS = [['cast', '등장인물'], ['style', '작가'], ['set', '설정']];

    function render() {
        if (!ui.root?.isConnected) return;
        const active = doc.activeElement;

        if (active && ui.root.contains(active) && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName) && !render.force) {
            render.pending = true;
            return;
        }
        render.pending = false;
        const scroller = doc.scrollingElement ?? doc.documentElement;
        const keep = scroller.scrollTop;
        const now = ui.side ? 'side' + ui.side : ui.mode === 'asset' ? 'asset' + ui.atab : 'imagine' + ui.tab;
        const anim = ui.lastTab !== now;
        ui.lastTab = now;
        const pane = ui.side === 'cast' ? renderCast() : ui.side === 'style' ? renderStyle() : ui.side === 'set' ? renderSettings() : ui.mode === 'asset' ? (ui.atab === 'list' ? renderAssetList() : renderAsset()) : ui.tab === 'gallery' ? renderGallery() : renderReady();
        if (anim) pane.classList.add('anim');
        ui.root.replaceChildren(renderHead(), renderNav(), pane, renderFoot());
        scroller.scrollTop = keep;
        flipAssetMenu();
        loadThumbs();
    }

    function flipAssetMenu() {
        const m = ui.root.querySelector('.as-menu');
        const t = m?.parentElement;
        if (!t) return;
        const r = t.getBoundingClientRect(), box = ui.root.getBoundingClientRect();
        const below = Math.min(doc.documentElement.clientHeight, box.bottom) - r.bottom + 6;
        const above = r.top - Math.max(0, box.top) + 6;
        if (m.offsetHeight > below && above > below) m.classList.add('up');
    }
    const renderNow = () => { render.force = true; try { render(); } finally { render.force = false; } };

    function chipOf() {
        if (ui.mode === 'asset' && acs.run) return [`애드 에셋 ${acs.run.done}/${acs.run.n}`, 'run'];
        if (st.busy) return [st.busy.stage === 1 ? `그리는 중 ${st.busy.i}/${st.busy.n}` : st.busy.label, 'run'];
        if (st.view && !st.view.hasKey) return ['키 없음', 'bad'];
        if (!setupDone()) return ['준비 전', ''];
        if (st.err || [...failed.values()].some(f => f.chat === st.view?.chatKey)) return ['실패', 'bad'];
        return null;
    }

    const HEAD_ICON = {
        logo: '<circle cx="13.5" cy="6.5" r="1" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r="1" fill="currentColor" stroke="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
        imagine: '<path d="M3 4h18v16H3z"/><circle cx="8.5" cy="9" r="1.6"/><path d="M21 15l-5-5L5 20"/>',
        cast: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h4a4.5 4.5 0 0 1 4.5 4.5V20"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14a4.5 4.5 0 0 1 3 4.2V20"/>',
        style: '<path d="M18 3l3 3-9.5 9.5-3-3z"/><path d="M8.5 12.5C6 12.5 4.5 14 4.5 16.5c0 1.5-.8 2.6-2 3.5 4.5.5 8-1 8-4.5z"/>',
        set: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
        asset: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 21v-2.5A4.5 4.5 0 0 1 9.5 14h5a4.5 4.5 0 0 1 4.5 4.5V21"/><path d="M19 3v4M17 5h4"/>',
    };
    function headIcon(k) {
        const el = h('span', { class: 'hi', 'aria-hidden': 'true' });
        el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + HEAD_ICON[k] + '</svg>';
        return el;
    }
    function renderHead() {
        const chip = chipOf();
        return h('header', { class: 'ix-head fd' },
            h('div', { class: 'ix-brand' },
                h('span', { class: 'ix-logo' }, headIcon('logo'), '이매진'),
                acModeToggle(),
                chip ? h('span', { class: 'ix-chip ' + chip[1] }, chip[0]) : null,

                h('span', { class: 'sd', role: 'tablist', 'aria-label': '공통 화면' }, SIDE_TABS.map(([id, label]) => h('button', {
                    type: 'button', role: 'tab', class: ui.side === id ? 'on' : null, 'aria-selected': ui.side === id ? 'true' : 'false',
                    onclick: () => { ui.side = id; ui.menu = ''; acs.menu = ''; renderNow(); },
                }, headIcon(id), label)))),
            h('button', { class: 'ix-x', type: 'button', 'aria-label': '닫기', onclick: closePanel }, '×'));
    }

    function renderNav() {
        const asset = ui.mode === 'asset';
        const tabs = asset ? AC_TABS : TABS, cur = asset ? ui.atab : ui.tab;

        const v = st.view;
        const chip = !ui.side && v?.hasKey && (asset ? cur === 'make' && !v.group && !!acAst() : cur === 'ready') ? nlChip(asset) : null;
        return h('nav', { class: 'ix-nav' + (asset ? ' as' : '') },
            h('div', { class: 'ix-tabs', role: 'tablist', 'aria-label': asset ? '애드 에셋 화면' : '삽화 화면' }, tabs.map(([id, label]) => h('button', {
                class: 'ix-tab' + (!ui.side && cur === id ? ' on' : ''), type: 'button', role: 'tab', 'aria-selected': !ui.side && cur === id ? 'true' : 'false',
                onclick: () => { if (asset) ui.atab = id; else ui.tab = id; ui.side = ''; ui.menu = ''; acs.menu = ''; renderNow(); },
            }, label()))),
            chip);
    }

    function renderFoot() {
        if (ui.mode === 'asset') {
            return h('footer', { class: 'ix-foot' },
                h('span', null, `이매진 v${VERSION} · 애드 에셋 · ${modelName(st.set.model)}`),
                h('span', null, '그림은 봇의 추가 에셋에 c_인물_복장_감정 이름으로 저장됩니다'));
        }
        return h('footer', { class: 'ix-foot' },
            h('span', null, `이매진 v${VERSION} · ${MODELS.find(m => m[0] === st.set.model)?.[1] ?? st.set.model} · ${kindName()} · ${countNow()}장 · ${sizeName(sizeNow())}`),
            h('span', null, '그림은 봇의 추가 에셋에 nc_… 이름으로 저장됩니다'));
    }

    function armButton(label, armedLabel, onFire, cls = 'ix-btn sm warn') {
        let armed = false, timer = 0;
        const btn = h('button', {
            class: cls, type: 'button',
            onclick: () => {
                if (!armed) {
                    armed = true;
                    const kids = [...btn.childNodes];
                    btn.classList.add('armed');
                    btn.textContent = armedLabel;
                    timer = setTimeout(() => { armed = false; btn.classList.remove('armed'); btn.replaceChildren(...kids); }, 3000);
                    return;
                }
                clearTimeout(timer);
                onFire();
            },
        }, label);
        return btn;
    }

    function toggle(on, onclick, disabled) {
        return h('button', { class: 'cf-tg' + (on ? ' on' : ''), type: 'button', role: 'switch', 'aria-checked': on ? 'true' : 'false', disabled, onclick },
            h('span', { class: 'cf-tg-lb' }, on ? '켜짐' : '꺼짐'), h('span', { class: 'cf-tg-tr' }, h('i')));
    }
    function seg(options, value, onpick) {
        return h('div', { class: 'cf-seg', role: 'radiogroup' }, options.map(([v, label]) => h('button', {
            type: 'button', class: v === value ? 'sel' : '', role: 'radio', 'aria-checked': v === value ? 'true' : 'false',
            onclick: () => onpick(v),
        }, label)));
    }

    function sizeRow(label, note, options, value, [lo, hi], unit, onPick) {
        const own = !options.some(([v]) => v === value);
        return h('div', { class: 'cf-row' },
            h('div', { class: 'cf-tx' }, h('b', null, label), note ? h('p', null, note) : null),
            h('div', { class: 'cf-pickbox' },
                seg(options, value, v => { if (v !== value) onPick(v); }),
                h('label', { class: 'cf-ownbox' },
                    h('input', {
                        class: 'cf-num' + (own ? ' sel' : ''), type: 'text', inputmode: 'numeric', value: own ? value : '', placeholder: '직접 입력', 'aria-label': label + ' 직접 입력',
                        oninput: e => { const v = e.target.value.replace(/\D/g, ''); if (v !== e.target.value) e.target.value = v; },
                        onkeydown: e => { if (e.key === 'Enter') e.target.blur(); },
                        onchange: e => {
                            const raw = e.target.value;
                            if (!raw) { if (own) e.target.value = value; return; }
                            const v = String(Math.min(hi, Math.max(lo, Number(raw))));
                            e.target.value = v;
                            if (v !== value) onPick(v);
                        },
                    }), h('span', null, unit))));
    }

    function modelPick(value, onPick) {
        const own = !MODELS.some(([v]) => v === value);
        return h('div', { class: 'cf-pickbox' },
            seg(MODELS, value, v => { if (v !== value) onPick(v); }),
            h('label', { class: 'cf-ownbox' },
                h('input', {
                    class: 'cf-num cf-mid' + (own ? ' sel' : ''), type: 'text', spellcheck: 'false', autocomplete: 'off',
                    value: own ? value : '', placeholder: '직접 입력 (모델 id)', 'aria-label': 'NAI 모델 id 직접 입력',
                    oninput: e => { const v = e.target.value.replace(/\s+/g, ''); if (v !== e.target.value) e.target.value = v; },
                    onkeydown: e => { if (e.key === 'Enter') e.target.blur(); },
                    onchange: e => {
                        const v = e.target.value.trim().toLowerCase();
                        if (!v) { if (own) e.target.value = value; return; }
                        e.target.value = v;
                        if (v !== value) onPick(v);
                    },
                })));
    }
    function setVal(key, value) {
        st.set = { ...st.set, [key]: value };
        saveSet();

        if (key === 'pc' || key === 'mo') st.sizeNote = { cls: 'wait', text: SIZE_WAIT };
        renderNow();
        if (['tap', 'ubtn', 'panelBtn', 'pc', 'mo'].includes(key)) void syncRoot(key);
        if (key === 'ubtn') void redrawChat();
        if (key === 'pc' || key === 'mo') sizeChanged();
        else if (key === 'tap' || key === 'ptOff') sizeChanged(false);
    }

    function renderProgress() {
        const b = st.busy;
        if (!b) return null;

        const only = b.lore && !b.job;
        const stages = only ? ['등장인물 분석'] : STAGES;
        const cols = only ? 'grid-template-columns:1fr' : '';

        const segs = stages.map((name, i) => {
            const cls = i < b.stage ? 'seg done' : 'seg';
            return h('div', { class: cls }, i === b.stage ? h('div', { class: 'fi', style: gaugeStyle(b.at, only ? 30 : 40) }) : null);
        });
        const names = stages.map((name, i) => h('span', { class: i < b.stage ? 'done' : i === b.stage ? 'cur' : '' },
            i === 1 && b.n ? `${name} ${b.i}/${b.n}` : name));
        return h('div', { class: 'pg', role: 'status' },
            h('div', { class: 'pg-now' },
                h('span', null, b.stage === 0 ? (b.lore ? `${llmName(b.llm ?? st.set.llm)} 모델이 로어북을 읽어 인물표를 짜는 중` : `${b.label}: ${llmName(b.llm ?? st.set.llm)} 모델이 연출을 짜는 중`) : b.stage === 1 ? `NAI 가 그리는 중 (${b.i}/${b.n})` : '봇에 저장하는 중'),
                h('button', { class: 'ix-btn sm warn', type: 'button', disabled: b.stop, onclick: cancelAll }, b.stop ? '멈추는 중' : st.jobs > 1 ? '모두 중단' : '중단')),
            h('div', { class: 'pg-bar', style: cols }, segs),
            h('div', { class: 'pg-nm', style: cols }, names),
            st.jobs > 1 ? h('div', { class: 'ix-hint', style: 'margin-top:6px' }, `뒤에 ${st.jobs - 1}개가 기다리는 중입니다. 중단하면 함께 취소합니다.`) : null);
    }

    function keyBox(full) {
        const v = st.view;
        let input;
        const save = async () => {
            const k = input.value.trim();
            if (!k) return;
            await setNaiKey(k);
            if (st.view) st.view.hasKey = true;
            st.keyShow = false;
            st.keyDraft = '';
            renderNow();
            void rootQueue(() => paintBusy());
        };
        const box = h('div', null,
            h('div', { class: 'cf-key' },
                input = h('input', {
                    class: 'cf-in', type: st.keyShow ? 'text' : 'password', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'NAI API 키',
                    placeholder: v?.hasKey ? '저장됨 · 바꾸려면 새 키를 넣으세요' : 'pst-… (NovelAI › 설정 › Account › Get Persistent API Token)',
                    onkeydown: e => { if (e.key === 'Enter' && !e.isComposing) void save(); },
                }),
                h('button', { class: 'ix-btn main', type: 'button', onclick: save }, '저장'),

                full ? h('button', {
                    class: 'ix-btn', type: 'button', 'aria-pressed': st.keyShow ? 'true' : 'false',
                    onclick: async () => {
                        if (st.keyShow) { st.keyShow = false; input.type = 'password'; renderNow(); return; }
                        if (!input.value.trim()) input.value = await naiKey().catch(() => '') || '';
                        if (!input.value.trim()) { input.focus(); return; }
                        st.keyShow = true;
                        renderNow();
                    },
                }, st.keyShow ? '키 가리기' : '키 확인') : null,
                full && v?.hasKey ? armButton('키 지우기', '한 번 더', async () => {
                    await setNaiKey('');
                    if (st.view) st.view.hasKey = false;
                    st.keyShow = false;
                    st.keyDraft = '';
                    renderNow();
                    void rootQueue(() => paintBusy());
                }, 'ix-btn warn') : null));

        input.addEventListener('input', () => { st.keyDraft = input.value; });
        if (st.keyDraft) input.value = st.keyDraft;
        else if (v?.hasKey) void naiKey().then(k => { if (k && !input.value) input.value = k; }).catch(() => {});
        return box;
    }

    function presetGrid(after, edit, asset = false) {
        const cur = edit ? edit.cur : asset ? acPreset() : preset();
        const used = preset().id, acUsed = acPreset().id;
        const badge = t => h('small', { style: 'margin-left:6px;font-weight:400;color:var(--accent)' }, t);
        return h('div', { class: 'ps', role: 'radiogroup' }, st.presets.map(p => h('button', {
            class: 'ps-it' + (p.id === cur.id ? ' sel' : ''), type: 'button', role: 'radio', 'aria-checked': p.id === cur.id ? 'true' : 'false',
            onclick: edit ? () => edit.pick(p.id)
                : asset ? () => { st.set = { ...st.set, acPresetId: p.id }; saveSet(); after?.(); renderNow(); }
                : () => { st.presetId = p.id; savePresets(); setStep('preset'); after?.(); renderNow(); },
        }, h('div', { class: 'ps-th' }, BUILTIN_THUMB[p.id] ? h('img', { src: BUILTIN_THUMB[p.id], alt: '' })
            : p.thumb ? h('img', { src: p.thumb, alt: '' })
            : p.thumbPath ? h('img', { 'data-path': p.thumbPath, alt: '' })
            : h('em', { class: 'ps-none' }, '아직 그린 그림 없음')),
        h('b', null, p.name || '이름 없음', edit && p.id === used ? badge('· 삽화') : null, edit && p.id === acUsed ? badge('· 애드 에셋') : null), h('span', { title: p.pos || '' }, p.pos))));
    }

    const noChat = pane => add(pane, h('div', { class: 'ix-empty' }, h('b', null, '열린 채팅이 없습니다'), '봇과 채팅을 연 뒤 다시 열어 주세요.'));

    function lastFail() {
        const v = st.view;
        let best = null;
        for (const [key, f] of failed) if (f.chat === v?.chatKey && (!best || f.at > best.at)) best = { key, ...f };
        return best;
    }

    const intro = (name, text) => h('p', { class: 'ix-intro' }, h('b', null, name + ':'), text);

    const llmName = k => k === 'model' ? '메인' : '보조';

    const llmCards = (key, onpick) => h('div', { class: 'dz', role: 'radiogroup' },
        [['model', '🧠', '메인 모델', '리수 설정 › 메인 모델로 보냅니다'], ['submodel', '⚡', '보조 모델', '리수 설정 › 보조 모델로 보냅니다']].map(([k, em, name, desc]) => {
            const on = (st.set[key] === 'model' ? 'model' : 'submodel') === k;
            return h('button', {
                class: 'dz-op' + (on ? ' sel' : ''), type: 'button', role: 'radio', 'aria-checked': on ? 'true' : 'false',
                onclick: () => { st.set = { ...st.set, [key]: k }; setStep(key); onpick(); renderNow(); },
            }, h('span', { class: 'dz-th' }, em), h('span', { class: 'dz-tx' }, h('b', null, name), h('span', null, desc)));
        }));
    function renderReady() {
        const v = st.view;
        const pane = h('section', { class: 'ix-pane' }, intro('삽화', '봇 답변이 올 때마다 그 장면을 NovelAI 로 그려 답변 안에 넣습니다. 만화 컷이나 한 장 그림으로 그립니다.'));
        if (!v) { noChat(pane); return pane; }
        const su = st.set.setup ?? {};
        const done = [!!su.llm, v.hasKey, !!su.model, !!su.kind, !!su.preset, !!su.count];
        const cur = done.indexOf(false);
        const stateOf = i => cur >= 0 && i > cur ? 'lock' : done[i] && ui.reopen !== i + 1 ? 'done' : 'cur';
        let hinted = false;
        if (v.hasKey) void acAnlas();
        const END = 7;

        const step = (n, title, sum, body) => {
            const state = n === END ? (cur < 0 ? 'done' : 'lock') : stateOf(n - 1);
            let bd = null;
            if (state === 'lock') {
                if (!hinted) { hinted = true; bd = h('p', { class: 'ix-hint', style: 'margin:0' }, '앞 단계를 마치면 열립니다.'); }
            } else if (state === 'cur' || n === END) bd = body();
            const open = n < END && ui.reopen === n && state === 'cur';
            return h('section', { class: `sp ${state}${n === END ? ' end' : ''}` },
                h('div', { class: 'sp-hd' },
                    h('span', { class: 'sp-n' }, state === 'done' ? '✓' : n),
                    h('b', null, title),
                    state === 'done' && sum ? h('span', { class: 'sp-sum' }, sum) : null,
                    n < END && state === 'done' && !st.busy ? h('button', { class: 'lnk', type: 'button', onclick: () => { ui.reopen = n; renderNow(); } }, '변경') : null,
                    open && done[n - 1] ? h('button', { class: 'lnk', type: 'button', onclick: () => { ui.reopen = 0; renderNow(); } }, '완료') : null),
                h('div', { class: 'sp-bd' }, bd));
        };
        add(pane,
            step(1, 'LLM 모델 고르기', `${llmName(st.set.llm)} 모델`, () => [
                llmCards('llm', () => { ui.reopen = 0; }),
                h('p', { class: 'ix-hint', style: 'margin:8px 0 0' }, '답변을 읽고 장면 · 대사 · 복장을 정할 모델입니다. 기본은 보조 모델이고, 카드를 누르면 다음 단계로 넘어갑니다. 애드 에셋은 애드 에셋 준비 탭에서 따로 고릅니다.')]),
            step(2, 'NovelAI 키 넣기', '키 저장됨', () => [
                keyBox(ui.reopen === 2),
                h('p', { class: 'ix-hint', style: 'margin:8px 0 0' }, 'NovelAI 웹 › 설정 › Account › Get Persistent API Token 에서 받은 pst- 로 시작하는 키를 넣으세요.')]),
            step(3, 'NAI 모델 고르기', modelName(st.set.model), () => [
                modelPick(st.set.model, m => { st.set = { ...st.set, model: m }; saveSet(); renderNow(); }),
                h('p', { class: 'ix-hint', style: 'margin:8px 0 0' }, '설정 탭의 NAI 모델과 같은 값입니다. 애드 에셋도 이 모델로 그립니다. 목록에 없는 모델은 id 를 직접 넣으세요.'),
                ui.reopen === 3 && su.model ? null : h('div', { class: 'ix-acts' }, h('button', { class: 'ix-btn main', type: 'button', onclick: () => { setStep('model'); ui.reopen = 0; renderNow(); } }, '이 모델로 다음'))]),
            step(4, '만화로 그릴까요, 삽화로 그릴까요?', kindName(), () => h('div', { class: 'dz', role: 'radiogroup' },
                [['comic', '🗯️', '만화 (V5 이상)', '한 장에 2~4컷, 답변 속 대사를 말풍선으로 넣습니다'], ['illust', '🖼️', '삽화', '칸 · 말풍선 없이 한 장면을 그립니다']].map(([k, em, name, desc]) => {
                    const on = !!su.kind && st.set.kind === k;
                    return h('button', {
                        class: 'dz-op' + (on ? ' sel' : ''), type: 'button', role: 'radio', 'aria-checked': on ? 'true' : 'false',
                        onclick: () => { st.set = { ...st.set, kind: k }; setStep('kind'); ui.reopen = 0; renderNow(); },
                    }, h('span', { class: 'dz-th' }, em), h('span', { class: 'dz-tx' }, h('b', null, name), h('span', null, desc)));
                }))),
            step(5, '작가 고르기', preset().name || '이름 없음', () => [
                presetGrid(() => { ui.reopen = 0; }),
                h('p', { class: 'ix-hint', style: 'margin:8px 0 0' }, '그림을 누르면 그 작가로 다음 단계로 넘어갑니다. 작가를 새로 만들거나 고치려면 ', h('button', { class: 'lnk', type: 'button', onclick: () => { ui.side = 'style'; renderNow(); } }, '작가 탭'), '을 여세요.'),
                ui.reopen === 5 && su.preset ? null : h('div', { class: 'ix-acts' }, h('button', { class: 'ix-btn main', type: 'button', onclick: () => { setStep('preset'); ui.reopen = 0; renderNow(); } }, '이 작가로 다음'))]),
            step(6, '장 수 고르기', `${countNow()}장`, () => h('div', { class: 'cf-card' }, h('div', { class: 'cf-row' },
                h('div', { class: 'cf-tx' }, h('b', null, '한 번에 몇 장을 그릴까요?'), h('p', null, '장마다 답변 속 다른 장면을 고릅니다. 장마다 NAI 요청이 하나씩 갑니다.')),
                seg([[1, '1장'], [2, '2장'], [3, '3장'], [4, '4장']], su.count ? countNow() : null, n => { st.set = { ...st.set, count: n }; setStep('count'); ui.reopen = 0; renderNow(); })))),
            step(END, '완료', recipe(), () => renderReadyEnd()));
        add(pane, renderReadyBar());
        return pane;
    }

    const rawBox = f => f?.raw ? h('details', { class: 'raw-box' }, h('summary', null, '모델 응답 원문 보기'), h('pre', null, f.raw)) : null;

    function renderReadyEnd() {
        const v = st.view;
        const toGallery = h('button', { class: 'lnk', type: 'button', onclick: () => { ui.mode = 'imagine'; ui.tab = 'gallery'; ui.side = ''; renderNow(); } }, '삽화 목록 보기 →');
        if (st.busy) return [renderProgress(), h('p', { class: 'ix-hint', style: 'margin:8px 0 0' }, '창을 닫아도 됩니다. 다 그리면 그 답변 아래에 그림이 들어갑니다. '), toGallery];
        const f = lastFail();
        if (f) return [
            h('div', { class: 'ix-msg err', role: 'alert' }, `#${f.idx} 답변을 그리지 못했습니다. ${f.error}`),
            rawBox(f),
            h('div', { class: 'ix-acts' },
                h('button', { class: 'ix-btn main sm', type: 'button', disabled: !v.hasKey || st.jobs > 0, onclick: () => draw(f.idx, 'new') }, '↻ 다시 시도'),
                h('button', { class: 'ix-btn sm', type: 'button', onclick: () => { failed.delete(f.key); st.err = ''; renderNow(); } }, '닫기'))];
        return [
            h('div', { class: 'ix-msg ok-box', style: 'margin-top:0' }, st.set.auto ? '준비가 끝났습니다. 채팅을 진행하면 자동으로 이미지가 생성됩니다.' : '준비가 끝났습니다. 자동 그리기가 꺼져 있으니, 봇 답변 아래의 「이미지 생성」 버튼을 눌러 그 답변을 그리세요.'),
            h('div', { class: 'cf-card', style: 'margin-top:10px' }, h('div', { class: 'cf-row sw' },
                h('div', { class: 'cf-tx' }, h('b', null, '답변이 오면 자동으로 그리기'), h('p', null, '봇 답변이 끝날 때마다 그 답변을 이 설정대로 그립니다 (다시 굴리기 포함).')),
                toggle(st.set.auto, () => setVal('auto', !st.set.auto)))),
            h('div', { class: 'ix-under' }, toGallery)];
    }

    function renderReadyBar() {
        const v = st.view;
        const su = st.set.setup ?? {};
        const n = [su.llm, v.hasKey, su.model, su.kind, su.preset, su.count].filter(Boolean).length;
        let cls = '', text;
        if (st.busy) { cls = 'wait'; text = `${st.busy.label}…`; }
        else if (!su.llm) text = 'LLM 모델을 고르면 다음 단계가 열립니다.';
        else if (!v.hasKey) { cls = 'err'; text = 'NAI 키를 넣어야 그릴 수 있습니다.'; }
        else if (!setupDone()) text = `6단계 중 ${n}단계를 마쳤습니다. 남은 단계를 고르면 그릴 준비가 끝납니다.`;
        else if (lastFail()) { cls = 'err'; text = '그리지 못한 답변이 있습니다.'; }
        else { cls = 'ok'; text = `✓ 준비됨 · ${recipe()} · 자동 그리기 ${st.set.auto ? '켜짐' : '꺼짐'}`; }
        return h('div', { class: 'ab' }, h('span', { class: 'ab-tx ' + cls }, text));
    }

    function renderGallery() {
        const v = st.view;
        const pane = h('section', { class: 'ix-pane' });
        if (!v) { noChat(pane); return pane; }
        const answers = v.msgs.filter(m => m.role === 'char').map(m => {

            const r = m.recKey ? v.recs[m.recKey] ?? v.recs[m.key] : null;
            return { ...m, rec: r && r.chat === v.chatKey ? r : null };
        }).reverse();
        const latestI = answers[0]?.i;
        const nImg = answers.reduce((n, a) => n + (a.rec?.images?.length ?? 0), 0);
        const nHas = answers.filter(a => a.rec?.images?.length).length;
        const goneOn = ui.galFilter === 'gone';
        const list = goneOn ? [] : answers.filter(a => ui.galFilter === 'has' ? a.rec?.images?.length : ui.galFilter === 'none' ? !a.rec?.images?.length : true);

        const shown = new Set(answers.map(a => a.rec).filter(Boolean));
        const gone = Object.values(v.recs)
            .filter(r => r.chat === v.chatKey && r.images?.length && !shown.has(r))
            .sort((a, b) => (b.at ?? 0) - (a.at ?? 0));
        const nGone = gone.reduce((n, r) => n + r.images.length, 0);

        const goneNames = new Set(gone.flatMap(r => r.images.map(x => String(x?.name ?? '').toLowerCase())));
        const og = !v.group && acs.gone?.chaId === v.chaId ? acs.gone : null;
        const nOther = og ? og.list.filter(t => !goneNames.has(String(t.name).toLowerCase())).length : 0;
        const goneLabel = og || nGone ? `지운 답변 ${nGone + nOther}` : '지운 답변';
        add(pane,
            h('div', { class: 'gal-top' },
                h('span', { class: 'ix-hint' }, `답변 ${answers.length}개 · 그림 ${nImg}장${nGone ? ` · 지운 답변의 그림 ${nGone}장` : ''} · 「🎨 이미지 생성」은 준비 탭 설정(${recipe()})대로 그립니다.`),
                seg([['all', `전체 ${answers.length}`], ['has', `그림 있음 ${nHas}`], ['none', `그림 없음 ${answers.length - nHas}`], ['gone', goneLabel]], ui.galFilter,
                    f => { if (f === 'gone') { acs.gone = null; acs.goneMsg = ''; } ui.galFilter = f; ui.galLimit = 30; ui.menu = ''; acs.menu = ''; renderNow(); })),
            st.err && !st.busy && !lastFail() ? h('div', { class: 'ix-msg err', role: 'alert', style: 'margin:0 0 10px' }, st.err) : null,
            !st.busy && st.ok && st.note ? h('div', { class: 'ix-msg ok', style: 'margin:0 0 10px' }, st.note) : null);
        if (goneOn) {
            for (const r of gone) add(pane, renderGone(r));
            if (v.group) { if (!gone.length) add(pane, h('div', { class: 'gal-empty' }, '이 채팅에서 지운 답변의 그림이 없습니다.')); }
            else add(pane, goneSection(v, goneNames));
            return pane;
        }
        if (!answers.length) add(pane, h('div', { class: 'gal-empty' }, '아직 봇 답변이 없습니다.'));
        else if (!list.length) add(pane, h('div', { class: 'gal-empty' }, ui.galFilter === 'has' ? '아직 그린 그림이 없습니다.' : '모든 답변에 그림이 있습니다.'));
        for (const a of list.slice(0, ui.galLimit)) add(pane, renderAnswer(a, a.i === latestI));
        if (list.length > ui.galLimit) add(pane, h('div', { class: 'ix-acts' },
            h('button', { class: 'ix-btn', type: 'button', onclick: () => { ui.galLimit += 30; renderNow(); } }, `더 보기 (${list.length - ui.galLimit}개 남음)`)));
        const mine = Object.values(v.recs).filter(r => r.chat === v.chatKey && r.images?.length);
        if (mine.length) add(pane, h('div', { class: 'rz' },
            h('div', { class: 'rz-tx' }, h('b', null, '이 채팅의 삽화 모두 지우기'),
                h('span', null, `답변 ${mine.length}개에 들어간 그림 ${mine.reduce((n, r) => n + r.images.length, 0)}장을 채팅 · 봇 에셋 · 기록에서 뺍니다. 되돌릴 수 없습니다.`)),
            st.jobs > 0 ? h('button', { class: 'ix-btn warn', type: 'button', disabled: true }, '그리는 중에는 지울 수 없습니다')
                : armButton('모두 지우기', '한 번 더 누르면 지웁니다', async () => {
                    try { for (const r of mine) await removeRecord(r); } catch (error) { st.err = error.message || String(error); }
                    ui.menu = '';
                    await refreshView().catch(() => {});
                    renderNow();
                }, 'ix-btn warn')));
        return pane;
    }

    function renderAnswer(a, latest) {
        const v = st.view;
        const key = a.key;
        const imgs = a.rec?.images ?? [];
        const busyHere = st.busy?.key === key;
        const waiting = queued.has(key) && !busyHere;
        const fail = failed.get(key);
        const mx = imgs.find(x => ui.menu === key + '|' + x.name);
        const art = h('article', { class: 'ans' + (mx ? ' on' : '') },
            h('div', { class: 'ans-h' },
                h('span', { class: 'no' + (latest ? ' new' : '') }, `#${a.i}${latest ? ' 최신' : ''}`),
                h('span', { class: 'ans-st' + (imgs.length ? ' has' : '') }, imgs.length ? `그림 ${imgs.length}장` : '그림 없음')),
            h('div', { class: 'ans-tx' }, a.text || '(빈 답변)'),
            imgs.length ? h('div', { class: 'ans-g' }, imgs.map(x => renderTile(key, x))) : null,
            mx ? renderMenu(a, mx) : null,
            a.rec && st.promptOpen.has(key) ? h('div', { class: 'ans-pv' }, renderPrompt(a.rec, busyHere || waiting, a.i)) : null);
        let foot;
        if (busyHere) foot = renderProgress();
        else if (waiting) foot = [h('button', { class: 'ix-btn sm', type: 'button', disabled: true }, '⏳ 기다리는 중'), h('span', { class: 'ix-hint' }, '앞의 그림이 끝나면 그립니다')];
        else if (!v.hasKey) foot = [h('button', { class: 'ix-btn sm', type: 'button', disabled: true }, '🎨 이미지 생성'), h('span', { class: 'ix-hint' }, 'NAI 키가 필요합니다')];
        else if (!setupDone()) foot = [h('button', { class: 'ix-btn sm', type: 'button', onclick: () => { ui.mode = 'imagine'; ui.tab = 'ready'; ui.side = ''; renderNow(); } }, '🎨 이미지 생성'), h('span', { class: 'ix-hint' }, '준비 탭을 먼저 마쳐 주세요')];

        else if (imgs.length) foot = fail ? [h('span', { class: 'bad-tx' }, `✕ 그리지 못했습니다. ${fail.error}`)] : null;
        else foot = [
            fail ? h('span', { class: 'bad-tx' }, `✕ 그리지 못했습니다. ${fail.error}`) : null,
            h('button', { class: 'ix-btn sm main', type: 'button', onclick: () => draw(a.i, 'new') }, fail ? '↻ 다시 시도' : '🎨 이미지 생성'),
            h('span', { class: 'ix-hint' }, recipe())];
        add(art, foot ? h('div', { class: 'ans-f' }, foot) : h('div', { style: 'height:12px' }), !busyHere && !waiting ? rawBox(fail) : null);
        return art;
    }

    function renderGone(r) {
        const t = r.at ? new Date(r.at) : null;
        const when = t ? `${t.getMonth() + 1}/${t.getDate()} ${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}에 그림` : '';
        return h('article', { class: 'ans gone' },
            h('div', { class: 'ans-h' },
                h('span', { class: 'no' }, '지운 답변'),
                h('span', { class: 'ans-st has' }, `그림 ${r.images.length}장`),
                when ? h('span', { class: 'ans-st' }, when) : null),
            h('div', { class: 'ans-tx' }, r.excerpt || '(채팅에서 지운 답변)'),
            h('div', { class: 'ans-g' }, r.images.map(x => renderTile(r.key, x, true))),
            h('div', { class: 'ans-f' },
                st.jobs > 0 ? h('button', { class: 'ix-btn sm warn', type: 'button', disabled: true }, '그리는 중에는 지울 수 없습니다')
                    : armButton('🗑 이 그림 지우기', '한 번 더 누르면 지웁니다', async () => {
                        try { await removeRecord(r); } catch (error) { st.err = error.message || String(error); }
                        await refreshView().catch(() => {});
                        renderNow();
                    }),
                h('span', { class: 'ix-hint' }, '채팅에서 지운 답변이라 다시 그릴 수 없습니다. 지우면 봇 에셋 · 기록에서도 뺍니다')));
    }

    function renderTile(key, x, still) {
        const id = key + '|' + x.name;
        const comic = x.req?.panels > 1;
        return h('div', { class: 'tile' },
            h('button', { class: 'im', type: 'button', 'aria-label': '크게 보기', onclick: () => showBig(x.path) }, h('img', { 'data-path': x.path, alt: x.title || '그림' })),
            h('div', { class: 'cap' },
                h('div', null, h('b', null, x.title || (comic ? '만화' : '그림')), h('span', null, comic ? `${x.req.panels}컷 만화` : x.req ? '삽화' : '그림')),
                still ? null : h('button', {
                    class: 'more' + (ui.menu === id ? ' on' : ''), type: 'button', 'aria-label': '그림 메뉴', 'aria-expanded': ui.menu === id ? 'true' : 'false',
                    onclick: () => { ui.menu = ui.menu === id ? '' : id; renderNow(); },
                }, '⋯')));
    }

    function renderMenu(a, x) {
        const v = st.view;
        const busy = st.busy?.key === a.key || queued.has(a.key) || !v.hasKey;
        const open = st.promptOpen.has(a.key);
        return h('div', { class: 'menu', role: 'menu' },

            h('div', { class: 'menu-h' }, `「${x.title || '그림'}」`),
            h('button', { type: 'button', role: 'menuitem', disabled: busy, onclick: () => { ui.menu = ''; draw(a.i, 'draw', a.key, null, x.name); } },
                '🔁 다시 그리기', h('small', null, '장면은 그대로 두고 이 그림만 새로 뽑습니다')),
            h('button', { type: 'button', role: 'menuitem', disabled: busy, onclick: () => { ui.menu = ''; draw(a.i, 'new', a.key); } },
                '🎬 씬 재구성', h('small', null, '모델이 이 답변의 장면부터 다시 골라 그립니다')),
            h('button', { type: 'button', role: 'menuitem', onclick: () => { ui.menu = ''; open ? st.promptOpen.delete(a.key) : st.promptOpen.add(a.key); renderNow(); } },
                open ? '📝 프롬프트 창 닫기' : '📝 프롬프트 직접 고치기', h('small', null, '그림에 쓴 프롬프트를 열어 고친 뒤 그 글로 다시 그립니다')),
            armButton(['🗑 이 그림 지우기', h('small', null, '채팅 · 봇 에셋에서 이 한 장을 뺍니다')], '한 번 더 누르면 지웁니다', async () => {
                ui.menu = '';
                try { await removeImage(v.ci, v.chi, { chaId: v.chaId, type: v.group ? 'group' : 'char' }, a.key, a.i, x.name.toLowerCase()); }
                catch (error) { st.err = error.message || String(error); }
                renderNow();
            }, 'del'));
    }

    const DOT_COLORS = ['#00b4ff', '#ff6fa5', '#a78bfa', '#ff914d', '#00e08a', '#facc15', '#f87171', '#38bdf8'];
    function renderCoord(req, locked) {
        if ((req.panels ?? 1) !== 1) return null;
        const chars = charSlotsOf(req);
        if (!chars.length) return null;
        const free = chars.length >= 2 && !!req.useCoords;
        const box = h('div', { class: 'co' });
        let act = 0;
        const paint = () => {
            box.replaceChildren();
            const cells = [];
            for (let r = 1; r <= 5; r++) for (const col of CELL_COLS) {
                const code = col + r;
                const here = free ? chars.map((sl, k) => [sl, k]).filter(([sl]) => cellOf(sl.x, sl.y) === code) : [];
                cells.push(h('button', {
                    class: 'co-c', type: 'button', title: code, 'aria-label': `${code} 칸`, disabled: !free || !!locked,
                    onclick: () => { const xy = xyOfCell(code); chars[act].x = xy.x; chars[act].y = xy.y; paint(); },
                }, here.map(([, k]) => h('i', { class: 'co-d', style: `background:${DOT_COLORS[k % DOT_COLORS.length]}` }, String(k + 1)))));
            }
            add(box,
                h('h3', null, '좌표평면'),
                h('div', { class: 'co-wrap' },
                    h('div', { class: 'co-pl' }, cells, free ? null : h('span', { class: 'co-ct' }, 'NAI 자동')),
                    h('div', { class: 'co-side' },
                        chars.map((sl, k) => h('button', {
                            class: 'co-chip' + (free && k === act ? ' on' : ''), type: 'button', disabled: !free || !!locked,
                            onclick: () => { act = k; paint(); },
                        }, h('i', { class: 'co-d', style: `background:${DOT_COLORS[k % DOT_COLORS.length]}` }, String(k + 1)),
                            `${sl.name || '인물'}${free ? ` · ${cellOf(sl.x, sl.y)}` : ''}`)),
                        h('p', { class: 'ix-hint', style: 'margin:0' }, free
                            ? '점을 고른 뒤 칸을 누르면 그 인물이 그 자리로 옮겨 갑니다. A~E 는 왼쪽에서 오른쪽, 1~5 는 위에서 아래이고 C3 이 가운데입니다.'
                            : '인물이 1명이면 좌표를 보내지 않습니다. 자리는 NAI 가 프롬프트의 구도 태그를 보고 정하며, 대개 가운데에 옵니다.'))));
        };
        paint();
        return box;
    }

    function renderPrompt(rec, disabled, idx) {
        const draft = st.drafts[rec.key] ??= (rec.images ?? []).map(x => structuredClone(x.req));

        const orig = JSON.stringify((rec.images ?? []).map(x => x.req));
        const goBtn = h('button', { class: 'ix-btn main sm', type: 'button', disabled, onclick: () => draw(idx, 'edit', rec.key, structuredClone(draft)) });
        const undoBtn = h('button', { class: 'ix-btn sm', type: 'button', onclick: () => { if (disabled) return; delete st.drafts[rec.key]; renderNow(); } }, '↩ 고치기 전으로');
        const stateTx = h('span', { class: 'ix-hint' });
        const sync = () => {
            const dirty = JSON.stringify(draft) !== orig;
            goBtn.textContent = '✏️ 저장 후 재생성';
            undoBtn.disabled = !dirty || !!disabled;
            stateTx.textContent = disabled ? '' : dirty ? '고친 곳이 있습니다. 그리기 전에는 저장되지 않습니다.' : '아직 고친 곳이 없습니다.';
        };
        const box = h('div', { class: 'pv', oninput: sync, onclick: () => setTimeout(sync, 0) },
            h('div', { class: 'pv-h' },
                h('div', null, h('b', null, '📝 프롬프트 직접 고치기'), h('span', null, `이 답변의 그림 ${draft.length}장에 쓴 프롬프트입니다. 고친 뒤 아래 파란 버튼을 누르면 그 글로 다시 그립니다.`)),
                h('button', { class: 'ix-btn sm', type: 'button', onclick: () => { st.promptOpen.delete(rec.key); renderNow(); } }, '✕ 닫기')));
        draft.forEach((req, n) => {
            if (draft.length > 1) add(box, h('h3', { class: 'pv-n' }, `${n + 1}번째 그림 (${req.w}×${req.h})`));
            add(box,
                h('h3', null, '본 프롬프트'),
                h('textarea', { class: 'cf-ta', disabled, oninput: e => { req.base = e.target.value; } }, req.base),
                ...(req.slots ?? []).flatMap((sl, k) => [
                    h('h3', null, `칸 ${k + 1} · ${sl.kind === 'char' ? sl.name || '인물' : sl.kind === 'panel' ? `컷${sl.name ? ' · ' + sl.name : ''}` : sl.kind === 'narration' ? '나레이션' : '말풍선'}`),
                    h('textarea', { class: 'cf-ta', disabled, oninput: e => { sl.prompt = e.target.value; } }, sl.prompt),
                ]),
                renderCoord(req, disabled),
                h('h3', null, '부정 프롬프트'),
                h('textarea', { class: 'cf-ta', disabled, oninput: e => { req.neg = e.target.value; } }, req.neg),
                h('div', { class: 'ix-hint' }, `시드 ${rec.images?.[n]?.seed ?? '-'} · 위치 지정 ${coordsOn(req) ? '켜짐' : '꺼짐'}`));
        });
        sync();
        add(box, h('div', { class: 'ix-acts' },
            goBtn,
            undoBtn,
            h('button', {
                class: 'ix-btn sm', type: 'button',
                onclick: async () => {
                    const text = draft.map(r => [r.base, ...(r.slots ?? []).map((s, k) => `[칸 ${k + 1}] ${s.prompt}`), `[부정] ${r.neg}`].join('\n')).join('\n\n');
                    try { await navigator.clipboard.writeText(text); st.note = '프롬프트를 복사했습니다.'; } catch { st.note = '복사하지 못했습니다.'; }
                    st.ok = false;
                    renderNow();
                },
            }, '📋 복사'),
            stateTx));
        return box;
    }

    function draw(idx, mode, key, reqs, only) {
        const v = st.view;
        if (!v || idx < 0) return;
        const label = only ? '그림 다시 그리는 중' : mode === 'draw' ? '다시 그리는 중' : mode === 'edit' ? '고친 프롬프트로 그리는 중' : key ? '씬 재구성 중' : `${kindName()} 그리는 중`;
        enqueue({ ci: v.ci, chi: v.chi, idx, key: key ?? (v.rawMsgs[idx] ? msgKeyOf(v.rawMsgs[idx], idx, v.rawMsgs) : undefined), mode, reqs, only, label }).catch(() => {});
    }

    const thumbs = new Map();
    async function thumbUrl(path) {
        if (thumbs.has(path)) return thumbs.get(path);
        const p = (async () => {
            const data = await api.readImage(path);
            const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
            return URL.createObjectURL(new Blob([bytes], { type: mimeOf(bytes) }));
        })();
        thumbs.set(path, p);
        p.catch(() => thumbs.delete(path));
        return p;
    }
    function loadThumbs() {
        for (const img of ui.root?.querySelectorAll('img[data-path]') ?? []) {
            if (img.src) continue;
            thumbUrl(img.dataset.path).then(url => { img.src = url; }).catch(error => {
                console.warn(LOG, 'thumb', error);
                img.alt = '그림을 읽지 못했습니다';
            });
        }
    }
    async function showBig(path) {
        try {
            const url = await thumbUrl(path);
            const lb = h('div', { class: 'lb', role: 'dialog', 'aria-label': '크게 보기', onclick: () => lb.remove() },
                h('button', { class: 'lb-x', type: 'button', 'aria-label': '닫기' }, '✕'),
                h('img', { src: url, alt: '' }),
                h('span', { class: 'lb-tip' }, '아무 곳이나 누르거나 Esc 를 누르면 닫힙니다'));
            ui.root.append(lb);
        } catch {}
    }

    let castTimer = 0, stateTimer = 0;
    function castChanged(e) {
        if (e && e.src !== 'persona') e.src = 'edit';
        clearTimeout(castTimer);
        castTimer = setTimeout(() => {
            const v = st.view;
            if (v) saveCast(v.chaId, v.cast);
            writeVarsSoon();
        }, 500);
    }

    function writeVarsSoon() {
        clearTimeout(stateTimer);
        stateTimer = setTimeout(async () => {
            const v = st.view;
            if (!v) return;
            try {
                const chat = await api.getChatFromIndex(v.ci, v.chi);
                if (!chat) return;
                writeStateInto(chat, v.state, v.cast);
                await api.setChatToIndex(v.ci, v.chi, chat);
            } catch (error) {
                console.warn(LOG, 'state', error);
            }
        }, 600);
    }

    function slotPreview(e, state) {
        return joinTags(identTags(e.type, e.look, k => wearOf(e, state, k), k => noneOf(e, state, k)));
    }

    function renderCast() {
        const v = st.view;
        const pane = h('section', { class: 'ix-pane' });
        if (!v) { noChat(pane); return pane; }
        v.state.wear ??= {};

        ui.castOpen ??= new Set(v.cast.list.length === 1 ? [v.cast.list[0].id] : []);
        add(pane,
            h('div', { class: 'ix-acts', style: 'margin-top:0' },

                h('button', { class: 'ix-btn main', type: 'button', disabled: !!st.busy || v.group, onclick: () => rereadLore() }, '📖 등장인물 분석'),
                h('button', {
                    class: 'ix-btn', type: 'button',
                    onclick: () => {
                        const id = uid();
                        v.cast.list.push({ id, name: '새 인물', aliases: [], type: 'girl', look: '', wear: emptyWear(), src: 'edit', on: true });
                        ui.castOpen.add(id);
                        castChanged();
                        renderNow();
                    },
                }, '+ 인물 추가')),
            h('p', { class: 'ix-hint' }, v.group ? '그룹 채팅은 로어북을 읽을 수 없어, 인물을 직접 넣거나 그릴 때 모델이 알려 준 인물을 씁니다.'
                : '기본 칸과 그 밖의 특징은 이 봇 전체에, 지금 칸은 이 채팅에만 저장됩니다.'),
            h('p', { class: 'ix-hint' }, '이 채팅에서 처음 그릴 때는 채팅 전체를 읽어 장소 · 시간과 인물마다 지금 머리 · 몸 · 옷 아홉 칸을 찾습니다. 그다음부터는 그릴 답변과 그 바로 앞 봇 답변만 읽고 바뀐 것만 고칩니다.'),
            renderProgress(),
            st.err && ui.side === 'cast' ? h('div', { class: 'ix-msg err' }, st.err) : null,

            h('div', { class: 'state-row', style: 'margin-top:12px' },
                ...[['location', '📍 장소', 'classroom'], ['time', '🕒 시간', 'night']].map(([k, label, ex]) =>
                    h('label', { class: 'st-f' }, label,
                        h('input', {
                            class: 'cf-in', value: v.state[k] ?? '', placeholder: `모름 (예: ${ex})`, 'aria-label': label.slice(3),
                            oninput: ev => { v.state[k] = ev.target.value.trim(); writeVarsSoon(); },
                        }))),
                st.set.vars ? h('span', { class: 'ix-hint' }, '변수: {{getvar::nc_이름_top}} · hairstyle · bangs · haircolor · eyes · height · body · bottom · shoes') : null),
            h('h2', { class: 'sub' }, '등장인물', h('small', null, `${v.cast.list.length}명 · 이름을 누르면 펼쳐서 고칩니다`),
                v.cast.list.length > 1 ? h('button', {
                    class: 'ix-btn sm cc-all', type: 'button',
                    onclick: () => { const all = v.cast.list.every(e => ui.castOpen.has(e.id)); ui.castOpen = new Set(all ? [] : v.cast.list.map(e => e.id)); renderNow(); },
                }, v.cast.list.every(e => ui.castOpen.has(e.id)) ? '모두 접기' : '모두 펼치기') : null));
        if (!v.cast.list.length) {
            add(pane, h('div', { class: 'ix-empty' }, h('b', null, '아직 인물 태그가 없습니다'), '「등장인물 분석」을 누르면 로어북 · 페르소나에서 인물을 읽어 옵니다. 누르지 않아도 처음 그릴 때 자동으로 읽습니다.'));
            return pane;
        }
        const SRC = { lore: '로어북', persona: '페르소나', chat: '채팅에서', edit: '직접 고침' };
        const SEX = { girl: '여', boy: '남', other: '기타' };
        const HUES = ['#3d5afe', '#c2185b', '#00897b', '#ef6c00', '#7b1fa2', '#2e7d32', '#0277bd', '#6d4c41'];
        const open = ui.castOpen;
        const initial = name => (name || '?').trim().charAt(0).toUpperCase() || '?';
        v.cast.list.forEach((e, n) => {
            const now = v.state.wear[e.id] ?? {};
            const isOpen = open.has(e.id);
            const flip = () => { isOpen ? open.delete(e.id) : open.add(e.id); renderNow(); };
            const av = h('span', { class: 'cc-av', 'aria-hidden': 'true' }, initial(e.name));
            const nm = h('span', { class: 'cc-nm' }, e.name || '이름 없음');

            const sum = ['haircolor', 'hairstyle', 'top'].map(k => wearOf(e, v.state, k)).filter(Boolean).join(' · ') || e.look || '태그 없음';
            const changed = WEAR_KEYS.filter(k => now[k]).length;
            const card = h('article', { class: 'cc' + (isOpen ? ' open' : '') + (e.on === false ? ' off' : ''), style: `--cc:${HUES[n % HUES.length]}` },
                h('div', {
                    class: 'cc-hd', role: 'button', tabindex: '0', 'aria-expanded': isOpen ? 'true' : 'false', title: isOpen ? '접기' : '펼쳐서 고치기',
                    onclick: flip, onkeydown: ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); flip(); } },
                },
                    av,
                    h('div', { class: 'cc-ti' },
                        h('b', null, nm, h('span', { class: 'cc-sx' }, SEX[e.type] ?? '기타'), h('span', { class: 'cc-src ' + (e.src ?? '') }, SRC[e.src] ?? e.src ?? '')),
                        h('span', { class: 'cc-sum' }, sum)),
                    changed ? h('span', { class: 'cc-chg', title: '이 채팅에서 기본과 다르게 입은 칸' }, `지금 ${changed}칸`) : null,

                    h('span', { class: 'cc-sw', onclick: ev => ev.stopPropagation(), onkeydown: ev => ev.stopPropagation() },
                        toggle(e.on !== false, () => { e.on = e.on === false; castChanged(); renderNow(); })),
                    h('span', { class: 'cc-cv', 'aria-hidden': 'true' }, '▾')));
            if (isOpen) {
                const wd = h('div', { class: 'wd' }, h('span'), h('span', { class: 'wd-h' }, '기본 (이 봇 전체)'), h('span', { class: 'wd-h now' }, '지금 (이 채팅만)'));

                for (const [k, label, group] of WEAR) add(wd,
                    group !== WEAR[WEAR_KEYS.indexOf(k) - 1]?.[2] ? h('span', { class: 'wd-g' }, group) : null,
                    h('span', { class: 'wd-l' }, label),
                    h('input', {
                        class: 'cf-in', value: e.wear?.[k] ?? '', 'aria-label': `기본 ${label}`,
                        oninput: ev => { (e.wear ??= emptyWear())[k] = ev.target.value; castChanged(e); },
                    }),
                    h('input', {
                        class: 'cf-in now' + (now[k] ? ' on' : ''), value: now[k] ?? '', placeholder: baseWear(e, k) || (group === '옷' ? '모름 (벗었으면 none)' : '모름'), 'aria-label': `지금 ${label}`,
                        oninput: ev => {
                            const t = ev.target.value.trim();
                            const w = (v.state.wear[e.id] ??= {});
                            if (t) w[k] = t; else delete w[k];
                            ev.target.classList.toggle('on', !!t);
                            writeVarsSoon();
                        },
                    }));
                add(card, h('div', { class: 'cc-bd' },
                    h('div', { class: 'cc-sec' },
                        h('h4', null, '이름'),
                        h('div', { class: 'cc-row' },
                            h('input', {
                                class: 'cf-in', value: e.name, 'aria-label': '이름',
                                oninput: ev => { e.name = ev.target.value; nm.textContent = e.name || '이름 없음'; av.textContent = initial(e.name); castChanged(e); },
                            }),
                            seg([['girl', '여'], ['boy', '남'], ['other', '기타']], e.type, t => { e.type = t; castChanged(e); renderNow(); })),
                        h('label', null, '다른 이름 (쉼표로 구분)',
                            h('input', { class: 'cf-in', value: (e.aliases ?? []).join(', '), oninput: ev => { e.aliases = ev.target.value.split(',').map(tidy).filter(Boolean); castChanged(e); } }))),
                    h('div', { class: 'cc-sec' },
                        h('h4', null, '그 밖의 특징', h('small', null, '피부 · 동물 귀 · 뿔 · 안경 · 흉터')),
                        h('textarea', { class: 'cf-ta', 'aria-label': '그 밖의 특징', oninput: ev => { e.look = ev.target.value; castChanged(e); } }, e.look ?? '')),
                    h('div', { class: 'cc-sec' },
                        h('h4', null, '머리 · 몸 · 옷', h('small', null, '지금 칸을 비우면 기본을 씁니다')),
                        wd),
                    h('div', { class: 'cc-sec' },
                        h('h4', null, 'NAI 태그', h('small', null, '성별 · 머리 · 눈 · 키 · 몸 · 특징 · 상의 · 하의 · 신발 · 빠진 옷 차례로 들어갑니다. 모자가 없으면 no headwear, 「지금」 칸이 none 인 상의 · 하의 · 신발은 topless · bottomless · no shoes 를 붙입니다')),
                        h('div', { class: 'cc-tags' }, slotPreview(e, v.state) || '(비어 있음)')),
                    h('div', { class: 'cc-ft' },
                        armButton('인물 삭제', '한 번 더 누르면 삭제', () => {
                            v.cast.list = v.cast.list.filter(x => x !== e);
                            delete v.state.wear[e.id];
                            open.delete(e.id);
                            castChanged();
                            renderNow();
                        }))));
            }
            add(pane, card);
        });
        return pane;
    }

    async function rereadLore(llm = st.set.llm) {
        const v = st.view;
        if (!v || st.busy) return;
        const busy = { label: '로어북 읽는 중', lore: true, llm, at: Date.now(), stage: 0, i: 0, n: 0, stop: false, key: '' };
        busy.halt = new Promise(resolve => { busy.onStop = resolve; });
        st.busy = busy;
        st.err = '';
        st.note = '';
        renderNow();
        try {
            const char = await api.getCharacterFromIndex(v.ci);
            const fresh = await readLore(char);
            if (!fresh.length) throw new Error('모델이 인물을 하나도 돌려주지 않았습니다.');
            mergeCast(v.cast, fresh);
            await saveCast(v.chaId, v.cast);
            writeVarsSoon();
            st.note = `인물 ${fresh.length}명을 읽었습니다.`;
            st.ok = true;
        } catch (error) {
            if (!error.isStop) st.err = error.message || String(error);
        } finally {
            if (st.busy === busy) st.busy = null;
            renderNow();
        }
    }

    const presetDrafts = new Map();
    const GEN_KEYS = ['steps', 'scale', 'cfgRescale', 'sampler'];
    const builtinOf = p => BUILTIN_PRESETS.find(b => b.id === p?.id);
    const isBuiltinAsIs = p => { const b = builtinOf(p); return !!b && ['name', 'pos', 'neg'].every(k => p[k] === b[k]) && JSON.stringify(presetGen(p)) === JSON.stringify(presetGen(b)); };
    function renderStyle() {
        const pane = h('section', { class: 'ix-pane' });

        const cur = st.presets.find(p => p.id === ui.styleId) ?? preset();
        ui.styleId = cur.id;
        const pick = x => ({ name: x.name, pos: x.pos, neg: x.neg, ...presetGen(x) });
        const draft = presetDrafts.get(cur.id) ?? pick(cur);
        presetDrafts.set(cur.id, draft);
        const saveBtn = h('button', {
            class: 'ix-btn main', type: 'button',
            onclick: () => { Object.assign(cur, draft, presetGen(draft)); presetDrafts.delete(cur.id); savePresets(); renderNow(); },
        }, '저장');
        const stateTx = h('span', { class: 'ix-hint' });

        const stepWarn = h('div', { class: 'ix-msg err' }, '스텝이 28을 넘으면 Opus 라도 Anlas 를 씁니다.');
        const sync = () => {
            const dirty = JSON.stringify(presetGen(draft)) !== JSON.stringify(presetGen(cur))
                || ['name', 'pos', 'neg'].some(k => draft[k] !== cur[k]);
            saveBtn.disabled = !dirty;
            stateTx.textContent = dirty ? '고친 곳이 있습니다. 저장을 눌러야 그림에 쓰입니다.' : '';
            stepWarn.style.display = presetGen(draft).steps > 28 ? '' : 'none';
        };

        const samplerBox = h('div');
        const paintSampler = () => {
            samplerBox.replaceChildren(seg(SAMPLERS, draft.sampler, v => { draft.sampler = v; paintSampler(); sync(); }));
        };
        paintSampler();
        const num = (label, key, min, max, step) => h('label', null, label, h('input', {
            class: 'cf-num', type: 'number', min, max, step, value: draft[key],
            oninput: e => { draft[key] = e.target.value; },
        }));
        sync();
        add(pane,
            h('h2', { class: 'sub', style: 'margin-top:0' }, '작가 목록', h('small', null, '누른 작가를 아래에서 고칩니다 · 그릴 작가는 준비 탭에서 고릅니다 · 카드 그림은 그 작가로 마지막에 그린 것 (내장 작가 셋은 고정)')),
            presetGrid(null, { cur, pick: id => { ui.styleId = id; renderNow(); } }),

            h('div', { class: 'ix-acts' },
                saveBtn,
                h('button', {
                    class: 'ix-btn', type: 'button',
                    onclick: () => {
                        const p = { id: uid(), name: '새 작가', pos: '', neg: ARTIST1.neg };
                        st.presets.push(p); ui.styleId = p.id; savePresets(); renderNow();
                    },
                }, '+ 새 작가'),
                h('button', {
                    class: 'ix-btn', type: 'button',
                    onclick: () => {
                        const p = { ...cur, id: uid(), name: cur.name + ' 사본', thumb: '', thumbPath: '' };
                        st.presets.push(p); ui.styleId = p.id; savePresets(); renderNow();
                    },
                }, '복제'),

                builtinOf(cur) && !isBuiltinAsIs(cur) ? armButton('기본값으로', '한 번 더 누르면 되돌립니다', () => {
                    const b = builtinOf(cur);
                    Object.assign(cur, { name: b.name, pos: b.pos, neg: b.neg });
                    for (const k of GEN_KEYS) { if (b[k] === undefined) delete cur[k]; else cur[k] = b[k]; }
                    presetDrafts.delete(cur.id);
                    savePresets();
                    renderNow();
                }, 'ix-btn') : null,
                st.presets.length > 1 ? armButton('삭제', '한 번 더 누르면 삭제', () => {
                    st.presets = st.presets.filter(p => p.id !== cur.id);

                    if (!st.presets.some(p => p.id === st.presetId)) st.presetId = st.presets[0].id;
                    if (st.set.acPresetId === cur.id) { st.set = { ...st.set, acPresetId: '' }; saveSet(); }
                    ui.styleId = st.presetId;
                    savePresets();
                    renderNow();
                }, 'ix-btn warn') : null,
                stateTx),
            h('div', { class: 'ed', oninput: sync },
                h('label', null, '이름', h('input', { value: draft.name, oninput: e => { draft.name = e.target.value; } })),
                h('label', null, '긍정 프롬프트 (작가 · 품질 태그) — 본 프롬프트에 들어갑니다',
                    h('textarea', { class: 'cf-ta', oninput: e => { draft.pos = e.target.value; } }, draft.pos)),
                h('label', null, '부정 프롬프트',
                    h('textarea', { class: 'cf-ta', oninput: e => { draft.neg = e.target.value; } }, draft.neg)),
                h('label', null, 'NovelAI 세부 — Opus 무료 범위는 스텝 28 이하입니다',
                    h('div', { class: 'cf-nums' },
                        num('스텝', 'steps', '1', '50', '1'),
                        num('가이던스', 'scale', '1', '10', '0.1'),
                        num('리스케일', 'cfgRescale', '0', '1', '0.02'))),
                stepWarn,

                h('div', { style: 'display:grid;gap:3px;font-size:.76rem;color:var(--muted)' }, '샘플러 (노이즈 스케줄은 karras 고정)', samplerBox),
                h('p', { class: 'ix-hint' }, '만화(2~4컷)를 그릴 때는 판 나눔 태그(comic, multiple panels, manga …)를 앱이 붙이고, 긍정의 sound effects 와 부정의 4koma · 2koma · multiple views(대사를 그릴 때는 subtitles · captions 도)를 그 요청에서만 뺍니다. 저장된 작가 프롬프트는 바뀌지 않습니다.')));
        return pane;
    }

    function limitRow(label, short, more, key, unit) {
        const v = Math.max(0, parseInt(st.set[key], 10) || 0);
        return h('div', { class: 'cf-row' },
            h('div', { class: 'cf-tx' }, h('b', null, label), h('p', null, short), more ? h('details', null, h('summary', null, '자세히'), h('p', null, more)) : null),
            h('label', { class: 'cf-ownbox' },
                h('input', {
                    class: 'cf-num' + (v ? ' sel' : ''), type: 'text', inputmode: 'numeric', value: v ? String(v) : '', placeholder: '제한 없음', 'aria-label': label,
                    oninput: e => { const x = e.target.value.replace(/\D/g, ''); if (x !== e.target.value) e.target.value = x; },
                    onkeydown: e => { if (e.key === 'Enter') e.target.blur(); },
                    onchange: e => setVal(key, Math.max(0, parseInt(e.target.value, 10) || 0)),
                }),
                h('span', null, unit)));
    }

    function dynMinRow() {
        const v = dynMinNow(), off = st.set.dynamic === false;
        const put = n => { n = Math.min(10, Math.max(1, n)); if (n !== dynMinNow()) setVal('dynMin', n); else renderNow(); };
        return h('div', { class: 'cf-row sw cf-subrow' + (off ? ' off' : '') },
            h('div', { class: 'cf-tx' }, h('b', null, '심각도 기준'), h('p', null, '1~10 중 이 값 이상인 장면에만 씁니다. 낮출수록 자주 씁니다 (기본 9).')),
            h('div', { class: 'cf-stp' },
                h('button', { type: 'button', 'aria-label': '심각도 기준 낮추기', disabled: off || v <= 1, onclick: () => put(v - 1) }, '−'),
                h('input', {
                    class: 'cf-num', type: 'text', inputmode: 'numeric', value: String(v), 'aria-label': '심각도 기준', disabled: off,
                    oninput: e => { const x = e.target.value.replace(/\D/g, ''); if (x !== e.target.value) e.target.value = x; },
                    onkeydown: e => { if (e.key === 'Enter') e.target.blur(); },
                    onchange: e => { const n = parseInt(e.target.value, 10); put(Number.isFinite(n) ? n : DYN_MIN_DEF); },
                }),
                h('button', { type: 'button', 'aria-label': '심각도 기준 높이기', disabled: off || v >= 10, onclick: () => put(v + 1) }, '+')));
    }
    function renderSettings() {
        const s = st.set;
        const pane = h('section', { class: 'ix-pane ix-set' });
        const textSet = key => e => { st.set[key] = e.target.value; clearTimeout(renderSettings.t); renderSettings.t = setTimeout(saveSet, 400); };

        const note = (short, more) => [short ? h('p', null, short) : null, more ? h('details', null, h('summary', null, '자세히'), h('p', null, more)) : null];
        const row = (cls, title, short, more, ...ctl) => h('div', { class: 'cf-row' + (cls ? ' ' + cls : '') }, h('div', { class: 'cf-tx' }, h('b', null, title), note(short, more)), ctl);
        const grp = (title, ...rows) => h('div', { class: 'cf-grp' }, h('h2', null, title), h('div', { class: 'cf-card' }, rows));
        const toReady = h('button', { class: 'lnk', type: 'button', onclick: () => { ui.mode = 'imagine'; ui.tab = 'ready'; ui.side = ''; renderNow(); } }, '준비 탭');

        const devRow = () => {
            const msg = h('span', { class: 'cf-dev-msg', role: 'status', 'aria-live': 'polite' });
            const go = async () => {
                let w = null;
                try { w = window.open(DEV_URL, '_blank'); } catch { }
                if (w) { try { w.opener = null; } catch { } return; }
                try { await navigator.clipboard.writeText(DEV_URL); msg.textContent = '새 창이 막혀 주소를 복사했습니다. 브라우저 주소창에 붙여 넣어 주세요.'; }
                catch { msg.textContent = '새 창이 막혔습니다. 위 주소를 길게 눌러 복사해 주세요.'; }
            };
            const gh = h('span', { class: 'cf-dev-gh', 'aria-hidden': 'true' });
            gh.innerHTML = GH_SVG;
            return h('div', { class: 'cf-dev' }, gh,
                h('div', { class: 'cf-dev-tx' },
                    h('small', null, 'MADE BY'),
                    h('b', null, DEV_URL.replace(/^https:\/\/github\.com\//, '')),
                    h('span', null, '신버전과 다른 작업을 깃허브에서 볼 수 있습니다.'),
                    msg),
                h('button', { class: 'cf-dev-go', type: 'button', onclick: go }, '깃허브 열기 ↗'));
        };
        add(pane,
            grp('NovelAI 키',
                row('col', 'NAI API 키', 'NovelAI 웹 › 설정 › Account › Get Persistent API Token 에서 받은 pst- 키를 넣습니다.',
                    '리수 설정 → 이미지 생성에 넣은 키는 플러그인이 읽을 수 없게 막혀 있어, 여기에 한 번 더 넣습니다. 리수의 플러그인 설정 칸(nai_api_key)과 같은 곳에 저장됩니다.',
                    keyBox(true)),
                row('col', 'NAI 모델', '목록에 없는 새 모델은 모델 id 를 직접 넣습니다.',
                    'NovelAI 웹의 모델 id 를 그대로 적습니다 (예: nai-diffusion-5-full-medium). 요청은 V4.5 · V5 와 같은 꼴로 보내므로, 다른 꼴을 요구하는 모델이면 NAI 가 오류를 내고 그 내용을 그림 자리에 보여 줍니다. 목록 버튼을 누르면 직접 넣은 id 는 지워집니다.',
                    modelPick(s.model, v => setVal('model', v)))),
            grp('그리기',
                h('div', { class: 'cf-row' }, h('p', { class: 'ix-hint', style: 'margin:0' }, '만화/삽화 · 장 수 · LLM 모델은 ', toReady, '에서, 작가는 작가 탭에서 바꿉니다. 애드 에셋의 LLM 모델은 애드 에셋 준비 탭에서 따로 고릅니다. 지금: ', recipe())),
                row('sw', '답변이 오면 자동으로 그리기', '봇 답변이 끝날 때마다 그 답변을 그립니다 (다시 굴리기 포함).',
                    '끄면 답변 아래 「이미지 생성」 버튼이나 「삽화 목록」 탭으로만 그립니다. 준비 탭을 마치기 전에는 켜져 있어도 그리지 않습니다.',
                    toggle(s.auto, () => setVal('auto', !s.auto))),
                row('col', '해상도', '모든 그림이 이 크기로 나옵니다.', s.kind === 'illust' ? null : '가로 · 정사각이면 모델이 2컷을 우선하고 3~4컷은 피합니다.',
                    seg(SIZE_OPTS, sizeNow(), v => setVal('size', v))),
                s.kind !== 'illust' ? row('sw', '말풍선', '답변에 있는 대사를 말풍선으로 넣습니다.',
                    '대사는 줄이거나 번역하지 않고 답변 그대로(같은 언어로) 옮기며, 한 그림에 최대 4개입니다. 말풍선에는 위치를 지정하지 않습니다. 끄면 부정에 speech bubble · text 를 넣습니다.',
                    toggle(s.bubbles, () => setVal('bubbles', !s.bubbles))) : null,
                row('sw', '유저 인풋 우선', '유저 입력이 부른 장면을 먼저 그립니다.',
                    '유저 입력은 이 설정과 상관없이 늘 참고로 보냅니다. 켜면 첫 장(만화 한 장이면 첫 컷)은 유저 입력이 그리는 순간이고, 나머지는 그 반응입니다. 유저 입력이 다른 인물의 행동을 지시해도 그 장면을 그립니다. 첫 컷 대사는 유저 입력에서 옮길 수 있습니다. 답변과 어긋나면 답변을 따릅니다. 바로 앞이 유저 입력이 아니면(첫 메시지 · 이어 쓰기) 끈 것과 같습니다.',
                    toggle(s.userFirst, () => setVal('userFirst', !s.userFirst))),
                row('sw', '장르 태그', '모델이 그림마다 장르를 고르면 그 장르의 태그를 붙입니다.',
                    null,
                    toggle(s.genre !== false, () => setVal('genre', s.genre === false))),
                row('sw', '다이나믹 프롬프트', '심각한 장면을 흑백 스케치 + 강조색으로 그립니다. 작가가 「이매진 그림체 (삽화용)」일 때만 동작합니다.',
                    null,
                    toggle(s.dynamic !== false, () => setVal('dynamic', s.dynamic === false))),
                dynMinRow()),
            grp('채팅 속 그림',
                row('', '「이미지 생성」 버튼', '봇 답변 아래에 두는 버튼입니다. 누르면 씬 재구성으로 그립니다. 모델이 그 답변의 장면부터 다시 고르고(「씬 재구성 중」) 이어서 그립니다(「그리는 중」). 이미 그림이 있어도 같습니다.',
                    '「안 씀」이면 자동 그리기와 이 창의 「삽화 목록」 탭으로만 그립니다. 준비 탭을 마치기 전에 누르면 이 창의 준비 탭을 엽니다.',
                    seg([['all', '모든 답변'], ['last', '마지막 답변'], ['none', '안 씀']], s.ubtn, v => setVal('ubtn', v))),
                sizeRow('PC 화면에서 가로', '화면 폭이 768px 보다 넓을 때의 그림 가로 길이입니다. 애드 에셋 초상화도 같은 크기로 보입니다.', PC_SIZES, s.pc, PC_RANGE, 'px', v => setVal('pc', v)),
                sizeRow('모바일 화면에서 가로', '화면 폭이 768px 이하일 때, 화면 폭에 대한 비율입니다. 애드 에셋 초상화도 같은 비율로 보입니다.', MO_SIZES, s.mo, MO_RANGE, '%', v => setVal('mo', v)),
                h('div', { class: 'cf-row' }, h('div', { class: 'cf-tx' }, note('', '고른 크기는 봇의 기본 변수 nc_pc · nc_mo 에 적고 지금 채팅을 바로 다시 그려 반영합니다. 답변이 나오는 중이면 끝난 뒤에 다시 그립니다. 1.2.0 이하에서 넣은 그림은 그 답변을 다시 그려야 크기가 바뀝니다.'))),
                row('sw', '이매진 버튼을 입력칸 옆으로 꺼내기', '☰ 메뉴 안의 🎨 이매진 버튼을 입력칸 왼쪽에도 하나 더 둡니다.', '☰ 메뉴의 버튼은 그대로 있습니다.',
                    toggle(s.panelBtn, () => setVal('panelBtn', !s.panelBtn))),
                needRoot() ? h('div', { class: 'cf-row' }, h('p', { class: 'ix-hint', style: 'margin:0' },
                    rootDenied() ? '리수 본문 화면 접근을 거절해서 답변 아래 버튼 · 그림 위 버튼 · 입력칸 옆 버튼이 동작하지 않습니다. ☰ 메뉴의 버튼은 그대로 쓸 수 있고, 리수를 다시 열면 다시 묻습니다.'
                        : '답변 아래 버튼 · 그림 위 버튼 · 입력칸 옆 버튼은 리수 본문 화면에 접근해야 해서, 처음 켤 때 리수가 동의를 한 번 묻습니다.')) : null),
            grp('이 봇의 그림',
                row('col', '봇의 기존 그림 숨기기', '이 봇의 백그라운드 임베딩 · 정규식 · Lua 트리거에서 에셋 그림을 띄우는 곳을 모델이 찾아 숨기고, 메시지 · 첫 메시지에 바로 쓴 에셋 그림({{img::…}} 등)도 화면에서 지웁니다. 이 봇에만 적용됩니다. (봇 정규식이 복잡하면 적용되지 않을 수 있습니다)',
                    null,
                    hideControls())),
            grp('등장인물 분석',
                h('div', { class: 'cf-row' }, h('p', { class: 'ix-hint', style: 'margin:0' }, '📖 등장인물 분석과, 캐스트에 없는 인물을 로어북에서 다시 찾을 때 쓰는 제한입니다. 0 이나 빈칸이면 제한하지 않습니다.')),
                limitRow('로어북 글자 수', '로어북이 이 글자 수를 넘으면 뒤쪽 항목은 보내지 않습니다.',
                    '로어북이 아주 길면 모델이 입력 길이 한도를 넘어 거절할 수 있습니다. 그럴 때 60000 같은 값을 넣습니다. 봇 설명 · 페르소나에는 따로 제한이 있습니다.',
                    'loreMax', '자'),
                limitRow('인물 수', '모델이 중요한 인물부터 이 수만큼만 돌려줍니다.', '제한이 없으면 모델이 외모가 나오는 인물을 모두 돌려줍니다.', 'castMax', '명')),
            grp('모델에게 주는 지시',
                row('col', '프롬프트 맨 위', '장면 모델에게 보내는 지시문 맨 앞에 그대로 넣습니다.',
                    '로어북 읽기와 장면 고르기 모두에 들어가고, 기본 규칙과 부딪히면 이 글을 먼저 따르게 합니다. 비워 두면 보내지 않습니다.',
                    h('textarea', {
                        class: 'cf-ta', rows: '5', 'aria-label': '프롬프트 맨 위',
                        placeholder: '예) 미나는 항상 둥근 안경을 쓴다. / 전투 장면은 역동적으로 그려라. / 배경은 밝게.',
                        oninput: textSet('head'),
                    }, s.head ?? '')),
                row('col', '프롬프트 맨 아래 (덧붙일 지시)', '요청 맨 끝에 덧붙입니다. 예) 배경을 자세히 / 코믹한 표정 위주로', null,
                    h('textarea', { class: 'cf-ta', style: 'min-height:64px', 'aria-label': '프롬프트 맨 아래', oninput: textSet('extra') }, s.extra))),
            grp('저장',
                row('sw', 'WebP 로 줄여 저장', 'PNG 대신 WebP(품질 70)로 저장해 봇 용량을 줄입니다. 그림 정보(프롬프트 · 설정 · 시드)는 EXIF 로 남깁니다.', null, toggle(s.webp, () => setVal('webp', !s.webp))),
                row('sw', '인물 칸을 채팅 변수로 쓰기', '인물마다 지금 아홉 칸과 그 밖의 특징, 장소를 채팅 변수에 적습니다.',
                    null,
                    toggle(s.vars, () => setVal('vars', !s.vars)))),
            devRow(),

            st.sizeNote ? h('div', { class: 'sz-bar', role: 'status', 'aria-live': 'polite' }, h('span', { class: 'sz-tx ' + st.sizeNote.cls }, st.sizeNote.text)) : null,
        );
        return pane;
    }

    const domListeners = [];
    function listen(target, type, fn) {
        target.addEventListener(type, fn);
        domListeners.push([target, type, fn]);
    }
    function ensureStyle() {
        if (!doc.getElementById('nai-comic-style')) doc.head.append(h('style', { id: 'nai-comic-style' }, CSS + AC_CSS));
        doc.body.classList.add('ix-on');
        if (domListeners.length) return;
        listen(doc, 'keydown', event => {
            if (event.key !== 'Escape' || event.isComposing) return;
            if ((acs.edit || acs.pe) && ui.root?.querySelector('.ac-ov')) { acs.edit = null; acs.pe = null; renderNow(); return; }
            const lb = ui.root?.querySelector('.lb');
            if (lb) lb.remove(); else closePanel();
        });

        listen(doc, 'focusout', () => setTimeout(() => { if (render.pending) render(); }, 0));
    }
    function closePanel() {
        acs.edit = null;
        acs.pe = null;
        ui.root?.remove();
        void api.hideContainer();
    }

    function hideControls() {
        const v = st.view;
        if (!v) return h('p', { class: 'ix-hint', style: 'margin:0' }, '봇 채팅을 연 뒤에 쓸 수 있습니다.');
        if (v.group) return h('p', { class: 'ix-hint', style: 'margin:0' }, '그룹 채팅에서는 쓸 수 없습니다. 봇 하나의 채팅에서 눌러 주세요.');
        const msg = hide.msg?.chaId === v.chaId ? hide.msg : null;
        return [hideButton(), msg ? h('div', { class: 'ix-msg' + (msg.cls === 'err' ? ' err' : msg.cls === 'ok' ? ' ok' : '') }, msg.text) : null];
    }

    const chaIdAt = new Map();
    async function curChaId() {
        const ci = await api.getCurrentCharacterIndex();
        if (!Number.isInteger(ci) || ci < 0) return '';
        if (st.view?.ci === ci) return st.view.chaId;
        if (!chaIdAt.has(ci)) chaIdAt.set(ci, (await api.getCharacterFromIndex(ci))?.chaId ?? '');
        return chaIdAt.get(ci);
    }

    async function refreshView() {
        const ci = await api.getCurrentCharacterIndex();
        const chi = await api.getCurrentChatIndex();
        const char = await api.getCharacterFromIndex(ci);
        const chat = char ? await api.getChatFromIndex(ci, chi) : null;

        chaIdAt.clear();
        if (char?.chaId) chaIdAt.set(ci, char.chaId);
        if (!char || !chat) { st.view = null; return; }
        const chaId = char.chaId;
        const [cast, recs, key] = await Promise.all([loadCast(chaId), loadRecs(chaId), naiKey(), loadAst(chaId)]);
        acReadHave(char);

        if (botHidden(char)) setAssetOff(chaId, true);
        const rawMsgs = chat.message ?? [];
        st.view = {
            ci, chi, chaId, name: char.name, group: char.type === 'group',
            chatKey: chatKeyOf(chat, chi), cast, recs, hasKey: !!key,
            state: readState(chat),
            hidden: botHidden(char) || st.set.assetOff.includes(chaId),
            rawMsgs: rawMsgs.map(m => ({ chatId: m?.chatId })),
            msgs: rawMsgs.map((m, i) => { const key = msgKeyOf(m, i, rawMsgs); return { i, role: m?.role, key, text: excerpt(m?.data, 120), recKey: recKeyIn(recs, chat, key, i) }; }),
        };
    }

    const TIPS = [
        '답변 아래 「🎨 이미지 생성」으로 그 답변만 그립니다.',
        '작가 탭에서 그림체를 만들고 고를 수 있습니다.',
        '설정 탭에서 PC · 모바일 그림 가로 크기를 바꿉니다.',
        '애드 에셋은 레퍼런스부터 그리고 확인을 받습니다.',
        '애드 에셋 커스텀에 「웃음, 눈물」처럼 감정을 적어 보세요.',
    ];
    const TIP_MS = 4500;

    const tipRow = () => {
        const start = Math.floor(Math.random() * TIPS.length);
        return h('div', { class: 'ix-tip' }, h('b', null, 'TIP'),
            h('div', { class: 'ix-tip-box' }, TIPS.map((tip, i) => h('span', { style: `animation-delay:${((i - start + TIPS.length) % TIPS.length) * TIP_MS}ms` }, tip))));
    };

    async function openPanel() {
        ensureStyle();
        ui.root ??= h('div', { class: 'ix', role: 'dialog', 'aria-label': '이매진' });
        if (!ui.root.isConnected) doc.body.append(ui.root);
        ui.root.replaceChildren(
            h('header', { class: 'ix-head' }, h('div', { class: 'ix-brand' }, h('span', { class: 'ix-logo' }, headIcon('logo'), '이매진')),
                h('button', { class: 'ix-x', type: 'button', 'aria-label': '닫기', onclick: closePanel }, '×')),
            h('section', { class: 'ix-pane' }, h('div', { class: 'ix-empty' }, h('b', null, '여는 중입니다'), '잠시만 기다려 주세요.',
                h('div', { class: 'ix-open-bar', role: 'progressbar', 'aria-label': '여는 중' }, h('div', { class: 'fi' })), tipRow())));
        void api.showContainer('fullscreen');
        try {
            await refreshView();
        } catch (error) {
            console.error(LOG, 'open', error);
            st.view = null;
        }
        if (!st.busy && !st.jobs) { st.note = ''; st.err = ''; st.ok = false; }
        st.drafts = {};
        ui.lastTab = null;

        ui.tab = 'ready';
        ui.side = '';
        ui.menu = '';
        ui.reopen = 0;
        renderNow();
    }

    const ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
        + '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>'
        + '<circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>'
        + '<circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>'
        + '<circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>'
        + '<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>'
        + '</svg>';
    const DRAW_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
        + '<path d="M12 19l7-7 3 3-7 7-3-3z"/>'
        + '<path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>'
        + '<path d="M2 2l7.586 7.586"/>'
        + '<circle cx="11" cy="11" r="2"/>'
        + '</svg>';

    const imp = o => Object.entries(o).map(([k, v]) => k.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + ':' + v + '!important').join(';');
    function figStyle() {
        const s = st.set;
        return imp({ position: 'relative', display: 'block', boxSizing: 'border-box', width: `min(${s.pc}px,${s.mo}vw)`, maxWidth: '100%', minWidth: '0', height: 'auto',
            margin: '19px auto', padding: '0', border: '0', float: 'none', transform: 'none' })
            + ';width:min({{getvar::nc_pc}}px,{{getvar::nc_mo}}vw)!important';
    }
    const WRAP_STYLE = imp({ position: 'static', display: 'block', boxSizing: 'border-box', width: '100%', height: 'auto', maxWidth: 'none', minWidth: '0',
        margin: '0', padding: '0', border: '0', float: 'none', transform: 'none' });
    const IMG_STYLE = imp({ position: 'static', display: 'block', boxSizing: 'border-box', width: '100%', height: 'auto', maxWidth: 'none', maxHeight: 'none', minWidth: '0', minHeight: '0', aspectRatio: 'auto',
        margin: '0', padding: '0', border: '0', borderRadius: '8px', boxShadow: 'none', float: 'none', transform: 'none', objectFit: 'fill', opacity: '1', visibility: 'visible' });
    const ACT_STYLE = imp({ position: 'absolute', top: '4px', right: '4px', left: '4px', bottom: 'auto', width: 'auto', height: 'auto', maxWidth: 'none', minWidth: '0',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'flex-start', gap: '6px', boxSizing: 'border-box',
        margin: '0', padding: '0', border: '0', background: 'none', float: 'none', transform: 'none', zIndex: '2', pointerEvents: 'none', transition: 'opacity .15s' });
    const BTN_STYLE = imp({ pointerEvents: 'auto', position: 'static', display: 'inline-block', boxSizing: 'border-box', width: 'auto', height: 'auto', maxWidth: 'none', minWidth: '0',
        margin: '0', padding: '5px 10px', border: '0', borderRadius: '999px', float: 'none', transform: 'none', color: '#fff', opacity: '1',
        fontSize: '12px', fontWeight: '400', fontStyle: 'normal', lineHeight: '1.3', letterSpacing: 'normal', textTransform: 'none', textDecoration: 'none', textShadow: 'none',
        cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' });

    const ACT_CSS = '.nc-fig.nc-fig .nc-act.nc-act{opacity:0!important;visibility:hidden!important;scale:0!important}'
        + '.nc-act.nc-act .nc-act-b.nc-act-b{background:rgba(0,0,0,.62)}'
        + '@media (hover:hover) and (pointer:fine){.nc-fig.nc-fig:hover .nc-act.nc-act{opacity:1!important;visibility:visible!important;scale:1!important}'
        + '.nc-act.nc-act .nc-act-b.nc-act-b:hover{background:rgba(37,99,235,.92)}'
        + '.nc-act.nc-act .nc-del.nc-del:hover{background:rgba(220,38,38,.92)}}'
        + '.nc-fig.nc-fig.nc-on .nc-act.nc-act{opacity:.92!important;visibility:visible!important;scale:1!important}';

    function figCss(ptHide) {
        const s = st.set;
        return `<style>.nc-fig,.nc-pt{position:relative;box-sizing:border-box;width:${s.pc}px;width:{{getvar::nc_pc}}px;max-width:100%;margin:19px auto}`
            + '.nc-fig img,.nc-pt img{display:block;margin:0!important;max-width:none!important;width:100%!important;height:auto!important;border-radius:8px!important}'
            + (ptHide ? '.nc-pt.nc-pt{display:none!important}' : '')
            + (s.tap ? ACT_CSS : '')
            + `@media (max-width:768px){.nc-fig,.nc-pt{width:${s.mo}vw;width:{{getvar::nc_mo}}vw}}</style>`;
    }

    const ACT_LABEL = { panel: '🎨 이매진', draw: '🔁 다시 그리기', new: '🎬 씬 재구성', del: '🗑 지우기' };
    const actHtml = name => `<div class="nc-act" style="${ACT_STYLE}">`
        + Object.entries(ACT_LABEL).map(([k, label]) => `<span class="nc-act-b nc-${k} nc-for-${name}" style="${BTN_STYLE}">${label}</span>`).join('')
        + '</div>';

    const FIG_RE = /<div class="nc-fig nc-id-(nc_[a-z0-9_]+)">(<div class="nc-act">)?/gi;
    const INLAY_RE = /(<div class="nc-fig nc-id-nc_[a-z0-9_]+" style="[^"]*">(?:<div class="nc-act"[^>]*>.*?<\/div>)?\s*)<div class="risu-inlay-image">(\s*)<img\b/gi;

    const PT_RE = /<div class="nc-pt nc-pt-(c_[a-z0-9_]+)">/g;

    const PT_HIDE = imp({ display: 'none' });
    const PT_INLAY_RE = /(<div class="nc-pt nc-pt-c_[a-z0-9_]+" style="[^"]*">\s*)<div class="risu-inlay-image">(\s*)<img\b/g;

    const PT_IMG_RE = /(<div class="nc-pt nc-pt-c_[a-z0-9_]+" style="[^"]*">\s*)<img\b/g;

    const GEN_TEXT = { idle: '이미지 생성', nokey: '이미지 생성 · NAI 키 필요' };

    const GEN_BASE = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', boxSizing: 'border-box', width: 'max-content', minWidth: '8.3em', maxWidth: '100%', minHeight: '30px', margin: '8px 0 2px', padding: '3px 11px',
        fontSize: '.78rem', lineHeight: '1.3', border: '1px solid #c7cdd6', userSelect: 'none' };
    const GEN_LOOKS = {

        idle: { color: '#fff', fontWeight: '700', background: '#141c2e', borderColor: '#c7cdd6', opacity: '1', cursor: 'pointer' },
        sub: { color: '#fff', fontWeight: '400', background: '#141c2e', borderColor: '#c7cdd6', opacity: '1', cursor: 'default' },
        off: { color: '#fff', fontWeight: '400', background: '#141c2e', borderColor: '#c7cdd6', opacity: '.5', cursor: 'not-allowed' },
        need: { color: '#fff', fontWeight: '400', background: '#141c2e', borderColor: '#c7cdd6', opacity: '.5', cursor: 'pointer' },
        run: { color: '#fff', fontWeight: '700', background: '#141c2e', borderColor: '#c7cdd6', opacity: '1', cursor: 'pointer' },
        bad: { color: '#fff', fontWeight: '700', background: '#b3261e', borderColor: '#8c1d18', opacity: '1', cursor: 'pointer' },
    };
    const cssOf = o => Object.entries(o).map(([k, v]) => k.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + ':' + v).join(';');

    const PAUSE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none" style="flex:none">'
        + '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    const FILL_BLUE = '#2f4a8a';
    const FILL_GREY = '#64748b';
    const gaugeLbl = (text, stopping) => (stopping ? '' : PAUSE_SVG) + `<span style="min-width:0;overflow:hidden;text-overflow:ellipsis">${text}</span>`;

    const gaugeHtml = (pct, text, stopping) => `<span class="x-risu-nc-fill" style="position:absolute;left:0;top:0;bottom:0;width:${pct}%;`
        + `background:${stopping ? FILL_GREY : FILL_BLUE};transition:width .45s ease-out,background .2s;pointer-events:none"></span>`
        + `<span class="x-risu-nc-size" style="visibility:hidden;white-space:nowrap;padding-left:18px">${GEN_TEXT.idle}</span>`
        + `<span class="x-risu-nc-lbl" style="position:absolute;left:11px;right:6px;top:0;bottom:0;display:flex;align-items:center;gap:4px;white-space:nowrap;overflow:hidden">${gaugeLbl(text, stopping)}</span>`;

    const FIG_RUN = imp({ position: 'relative', overflow: 'hidden' }) + ';background:rgba(15,23,42,.9)';
    const FIG_FILL = '#2563eb';
    const ACT_SHOW = imp({ opacity: '1', visibility: 'visible', scale: '1' });
    const figLbl = (text, sign) => (sign === 'run' ? PAUSE_SVG.replace(/"14"/g, '"12"') : '') + `<span style="min-width:0;overflow:hidden;text-overflow:ellipsis">${text}</span>`;
    const figGaugeHtml = (pct, text, act, sign) => `<span class="x-risu-nc-fill" style="position:absolute;left:0;top:0;bottom:0;width:${sign === 'wait' ? 0 : pct}%;`
        + `background:${sign === 'stop' ? FILL_GREY : FIG_FILL};transition:width .45s ease-out,background .2s;pointer-events:none"></span>`
        + `<span class="x-risu-nc-size" style="visibility:hidden;white-space:nowrap;padding-left:16px">${ACT_LABEL[act]}</span>`
        + `<span class="x-risu-nc-lbl" style="position:absolute;left:10px;right:6px;top:0;bottom:0;display:flex;align-items:center;gap:4px;white-space:nowrap;overflow:hidden">${figLbl(text, sign)}</span>`;
    function genHtml() {
        if (st.set.ubtn === 'none' || rootDenied()) return '';
        const off = keyKnown === false;
        return '{{#if {{and::{{equal::{{role}}::char}}::{{not::{{isfirstmsg}}}}}}}}'
            + `<span class="nc-gen nc-at-{{chat_index}}" style="${cssOf({ ...GEN_BASE, ...GEN_LOOKS[off ? 'need' : 'idle'] })}">${off ? GEN_TEXT.nokey : GEN_TEXT.idle}</span>`
            + '{{/if}}';
    }

    const RISU_ASSET_RE = /<div class="risu-inlay-image"><img src="([^"]*)" alt="\1" style="[^"]*"\/><\/div>\n?|<img src="([^"]*)" alt="\2" style="[^"]*"\/>|<video (?:controls autoplay|autoplay muted) loop><source src="[^"]*" type="video\/mp4"><\/video>\n?/g;
    const dropAssets = (text, on) => on ? text.replace(RISU_ASSET_RE, '') : text;
    async function ncDisplay(content) {
        if (typeof content !== 'string') return null;
        const gen = genHtml();
        const hasFig = content.includes('nc-fig'), hasPt = content.includes('nc-pt');

        const needId = (st.set.assetOff.length > 0 && /risu-inlay-image|<img src="|<video /.test(content)) || (st.set.ptOff.length > 0 && hasPt);
        const chaId = needId ? await curChaId().catch(() => '') : '';
        const assetHide = !!chaId && st.set.assetOff.includes(chaId);
        if (!hasFig && !hasPt) {
            const rest = dropAssets(content, assetHide);
            return gen ? rest + '\n\n' + gen : rest === content ? null : rest;
        }
        const acts = st.set.tap && !rootDenied();
        const fs = figStyle();
        const ptHide = !!chaId && hasPt && st.set.ptOff.includes(chaId);
        const body = content
            .replace(FIG_RE, (m, name, had) => `<div class="nc-fig nc-id-${name}" style="${fs}">` + (had ?? (acts ? actHtml(name) : '')))
            .replace(INLAY_RE, (m, head, sp) => `${head}<div class="risu-inlay-image" style="${WRAP_STYLE}">${sp}<img style="${IMG_STYLE}"`)
            .replace(PT_RE, (m, name) => `<div class="nc-pt nc-pt-${name}" style="${ptHide ? PT_HIDE : fs}">`)
            .replace(PT_INLAY_RE, (m, head, sp) => `${head}<div class="risu-inlay-image" style="${WRAP_STYLE}">${sp}<img style="${IMG_STYLE}"`)
            .replace(PT_IMG_RE, (m, head) => `${head}<img style="${IMG_STYLE}"`);

        return dropAssets(body, assetHide) + '\n\n' + gen + figCss(ptHide);
    }

    const varValues = () => ({ nc_pc: st.set.pc, nc_mo: st.set.mo });
    const keyOf = line => line.split('=')[0];
    const hasVars = text => /(^|\n)nc_(?:pc|mo)=/.test(String(text ?? ''));

    function withVars(text, values) {
        const src = String(text ?? '');
        const lines = src ? src.split('\n') : [];
        const seen = new Set();
        const out = [];
        for (const line of lines) {
            const key = keyOf(line);
            if (!(key in values)) { out.push(line); continue; }
            if (!seen.has(key)) out.push(key + '=' + values[key]);
            seen.add(key);
        }
        const add = Object.keys(values).filter(k => !seen.has(k)).map(k => k + '=' + values[k]);

        if (add.length && out.length && out[out.length - 1] === '') out.splice(out.length - 1, 0, ...add);
        else out.push(...add);
        return out.join('\n');
    }

    function putVars(char) {
        if (!char || char.type === 'group') return false;
        const before = String(char.defaultVariables ?? '');
        const next = withVars(before, varValues());
        if (next === before) return false;
        char.defaultVariables = next;
        return true;
    }
    async function syncVars() {
        const curIdx = await api.getCurrentCharacterIndex();
        let curId = '';
        const cur = Number.isInteger(curIdx) ? await api.getCharacterFromIndex(curIdx) : null;
        if (cur?.chaId) {
            curId = cur.chaId;
            const mine = hasVars(cur.defaultVariables) || Object.keys(await loadRecs(cur.chaId)).length > 0;

            const fresh = mine ? await api.getCharacterFromIndex(curIdx) : null;
            if (fresh?.chaId === curId && putVars(fresh)) await api.setCharacterToIndex(curIdx, fresh);
        }
        for (let i = 0; i < 100000; i++) {
            if (i === curIdx) continue;
            const c = await api.getCharacterFromIndex(i);
            if (!c) break;
            if (!c.chaId || c.chaId === curId || !hasVars(c.defaultVariables)) continue;
            if (putVars(c)) await api.setCharacterToIndex(i, c);
        }
    }

    async function redrawChat() {
        const ci = await api.getCurrentCharacterIndex();
        const chi = await api.getCurrentChatIndex();
        const chat = await api.getChatFromIndex(ci, chi);
        if (!chat || !Array.isArray(chat.message)) return 'nochat';
        if (chat.isStreaming) return 'streaming';
        for (const m of chat.message) {
            if (!m || typeof m !== 'object') continue;

            if (typeof m.data === 'string') m.data = wrapPortraits(m.data);
            if (m.disabled === undefined) m.disabled = false;
            else if (m.disabled === false) delete m.disabled;
        }
        await api.setChatToIndex(ci, chi, chat);
        return true;
    }

    const SIZE_WAIT = '바꾼 크기를 채팅에 반영하는 중입니다. 화면이 바로 바뀌지 않으면 잠깐 기다리거나, 다른 채팅방에 갔다가 돌아오면 바뀝니다.';
    let sizeChain = Promise.resolve();
    let sizeTimer = 0;
    let laterTimer = 0;
    function sizeChanged(vars = true) {
        clearTimeout(sizeTimer);
        clearTimeout(laterTimer);
        sizeTimer = setTimeout(() => {
            sizeTimer = 0;
            sizeChain = sizeChain.then(async () => {
                if (vars) await syncVars();
                await redrawNow(0);
            }).catch(error => {
                console.warn(LOG, 'size', error);
                st.sizeNote = { cls: 'err', text: `지금 채팅에 반영하지 못했습니다: ${error.message || error}. 채팅방을 다시 열면 바뀐 크기로 보입니다.` };
                render();
            });
        }, 600);
        return sizeChain;
    }
    async function redrawNow(tries) {
        const result = await redrawChat();
        if (result === 'streaming') {
            if (tries < 90) {
                st.sizeNote = { cls: 'warn', text: '답변이 나오는 중이라, 끝나면 채팅을 다시 그립니다.' };
                laterTimer = setTimeout(() => {
                    laterTimer = 0;
                    sizeChain = sizeChain.then(() => redrawNow(tries + 1)).catch(error => console.warn(LOG, 'size later', error));
                }, 2000);
            } else {
                st.sizeNote = { cls: 'err', text: '답변이 3분 넘게 이어져 채팅을 다시 그리지 않았습니다. 채팅방을 다시 열면 바뀐 크기로 보입니다.' };
            }
        } else {
            st.sizeNote = result === 'nochat'
                ? { cls: 'ok', text: '✔ 저장했습니다. 지금 열린 채팅이 없어 다시 그리지 않았습니다.' }
                : { cls: 'ok', text: '✔ 지금 채팅에 반영했습니다.' };
        }
        render();
    }

    const INBTN_CLASS = 'nc-inbtn ml-4 bg-textcolor2 flex justify-center items-center w-12 h-12 rounded-md hover:bg-blue-500 transition-colors text-textcolor';
    const PANBTN_CLASS = INBTN_CLASS.replace('nc-inbtn', 'nc-panbtn');
    const root = { doc: null, asked: false, done: false, on: false, observer: null, clickId: '', timer: 0, look: '', kids: '', job: Promise.resolve(),
        tick: 0, tone: '', pct: -1, pgBusy: null, pgKey: '', pgAt: 0, genText: new Map(), figMarked: false, figText: new Map() };
    const rootQueue = fn => (root.job = root.job.then(fn).catch(error => console.warn(LOG, 'root', error)));
    const needRoot = () => st.set.ubtn !== 'none' || st.set.panelBtn || st.set.tap;

    const rootDenied = () => root.done && !root.doc;
    const panSel = () => st.set.panelBtn ? '.nc-panbtn' : '';
    const inRect = (r, e) => !!r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;

    async function rootDoc() {
        if (!root.asked) {
            root.asked = true;
            try {
                root.doc = await api.getRootDocument();
            } catch (error) {
                console.warn(LOG, 'getRootDocument', error);
            }
            root.done = true;
        }
        return root.doc;
    }
    async function inputRow(d) {
        const area = await d.querySelector('textarea.text-input-area');
        return area ? await area.getParent() : null;
    }

    async function removeButtons(d, keep = []) {
        let gone = false;
        for (const sel of ['.nc-inbtn', '.nc-fab', '.nc-panbtn']) {
            if (keep.includes(sel)) continue;
            try {
                const b = await d.querySelector(sel);
                if (b) { await b.remove(); gone = true; }
            } catch {}
        }
        return gone;
    }

    const IN_GAP = '6px';
    async function tightenButtons(row, force = false) {
        const kids = await row.getChildren();
        const n = await kids.length();
        const head = n ? String(await (await kids.at(0)).getClassName() ?? '') : '';
        const sign = n + '|' + head;
        if (sign === root.kids && !force) return;
        root.kids = sign;
        let first = true;
        for (let i = 0; i < n; i++) {
            const k = await kids.at(i);
            const cls = i ? String(await k.getClassName() ?? '') : head;
            if (cls.includes('text-input-area')) break;
            if (!/(^|\s)w-12(\s|$)/.test(cls)) continue;
            const now = await k.getStyle('marginLeft');
            if (first) {
                first = false;
                if (now === IN_GAP) await k.setStyle('marginLeft', '');
            } else if (now !== IN_GAP) await k.setStyle('marginLeft', IN_GAP);
        }
    }

    function progressNow() {
        const b = st.busy;

        if (!b) return Math.max(0, root.pct);
        const key = b.stage + '|' + b.i;
        if (root.pgBusy !== b || root.pgKey !== key) { root.pgBusy = b; root.pgKey = key; root.pgAt = Date.now(); }
        const sec = (Date.now() - root.pgAt) / 1000;
        if (b.stage === 0) return 30 * (1 - Math.exp(-sec / 8));
        if (b.stage === 1) {
            const n = Math.max(1, b.n);
            const i = Math.min(Math.max(1, b.i), n);
            return 30 + 60 * (i - 1 + 0.95 * (1 - Math.exp(-sec / 5))) / n;
        }
        return 90 + 10 * (1 - Math.exp(-sec / 0.8));
    }
    function startTick() {
        if (!root.tick) root.tick = setInterval(() => void rootQueue(() => paintBusy()), 400);
    }
    function stopTick() {
        clearInterval(root.tick);
        root.tick = 0;
    }

    const runText = b => b.stage === 1 ? (b.n > 1 ? `그리기 ${b.i}/${b.n}` : '그리는 중') : b.stage === 2 ? '저장 중'
        : b.job?.mode === 'draw' ? '그리는 중' : '씬 재구성 중';

    function genState(idx, ci, chi, last) {
        if (!Number.isInteger(idx) || idx < 0 || (st.set.ubtn === 'last' && idx !== last)) return { sign: 'hide' };
        const here = o => !!o && o.ci === ci && o.chi === chi && o.idx === idx;
        const b = st.busy;
        if (here(b)) {
            if (b.stop) return { sign: 'stop', text: '멈추는 중', look: 'run', gauge: true };
            return { sign: 'run', text: runText(b), look: 'run', gauge: true };
        }
        if ([...jobsOn].some(j => j !== b?.job && here(j))) return { sign: 'wait', text: '기다리는 중', look: 'sub' };
        if (keyKnown === false) return { sign: 'nokey', text: GEN_TEXT.nokey, look: 'need' };
        if ([...failed.values()].some(here)) return { sign: 'fail', text: '다시 시도', look: 'bad' };
        return { sign: 'idle', text: GEN_TEXT.idle, look: 'idle' };
    }
    const genIdx = cls => { const m = /(?:^|\s)x-risu-nc-at-(-?\d+)(?:\s|$)/.exec(cls); return m ? Number(m[1]) : NaN; };

    async function paintGen(force = false, live = false) {
        const d = root.doc;
        if (!root.on || !d || st.set.ubtn === 'none') return;
        const els = await d.querySelectorAll('.x-risu-nc-gen');
        const n = await els.length();
        if (!n) return;
        const ci = await api.getCurrentCharacterIndex();
        const chi = await api.getCurrentChatIndex();
        const list = [];
        for (let i = 0; i < n; i++) {
            const el = await els.at(i);
            const cls = String(await el.getClassName() ?? '');
            list.push({ el, cls, idx: genIdx(cls) });
        }
        const last = Math.max(-1, ...list.map(x => Number.isInteger(x.idx) ? x.idx : -1));
        for (const { el, cls, idx } of list) {
            const g = genState(idx, ci, chi, last);
            const mark = 'nc-s-' + g.sign;
            const same = cls.split(/\s+/).some(c => c === mark || c === 'x-risu-' + mark);
            if (same && !force && (g.sign !== 'run' || !live)) continue;
            const pct = g.gauge ? Math.round(progressNow() * 10) / 10 : 0;
            if (g.gauge) root.pct = pct;
            if (!same || force) {
                if (g.sign === 'hide') await el.setStyle('display', 'none');
                else {
                    await el.setStyle('display', 'flex');
                    for (const [k, v] of Object.entries(GEN_LOOKS[g.look])) await el.setStyle(k, v);

                    await el.setStyle('position', g.gauge ? 'relative' : '');
                    await el.setStyle('overflow', g.gauge ? 'hidden' : '');
                    await el.setInnerHTML(g.gauge ? gaugeHtml(pct, g.text, g.sign === 'stop') : g.text);
                }
                await el.setClassName(cls.split(/\s+/).filter(c => c && !/^(x-risu-)?nc-s-/.test(c)).concat(mark).join(' '));
                root.genText.set(idx, g.text);
            } else if (g.sign === 'run') {

                await (await el.querySelector('.x-risu-nc-fill'))?.setStyle('width', pct + '%');
                if (root.genText.get(idx) !== g.text) {
                    await (await el.querySelector('.x-risu-nc-lbl'))?.setInnerHTML(gaugeLbl(g.text, false));
                    root.genText.set(idx, g.text);
                }
            }
        }
    }

    const figHit = (j, ci, chi, act, name) => !!j?.fig && j.ci === ci && j.chi === chi && j.fig.act === act && j.fig.name === name;
    function figState(act, name, ci, chi) {
        const b = st.busy;
        if (b && figHit(b.job, ci, chi, act, name)) return b.stop ? { sign: 'stop', text: '멈추는 중' } : { sign: 'run', text: runText(b) };
        if ([...jobsOn].some(j => j !== b?.job && figHit(j, ci, chi, act, name))) return { sign: 'wait', text: '기다리는 중' };
        return { sign: 'idle' };
    }
    async function paintFigs(live = false) {
        const d = root.doc;
        if (!root.on || !d || !st.set.tap) return;

        if (![...jobsOn].some(j => j.fig) && !root.figMarked) return;
        const els = await d.querySelectorAll('.x-risu-nc-act-b');
        const n = await els.length();
        const ci = await api.getCurrentCharacterIndex();
        const chi = await api.getCurrentChatIndex();
        let marked = false;
        for (let i = 0; i < n; i++) {
            const el = await els.at(i);
            const cls = String(await el.getClassName() ?? '');
            const act = /(?:^|\s)x-risu-nc-(draw|new)(?:\s|$)/.exec(cls)?.[1];
            const name = /(?:^|\s)x-risu-nc-for-(nc_[a-z0-9_]+)/i.exec(cls)?.[1]?.toLowerCase();
            if (!act || !name) continue;
            const g = figState(act, name, ci, chi);
            const was = /(?:^|\s)(?:x-risu-)?nc-s-(\w+)/.exec(cls)?.[1] ?? 'idle';
            if (g.sign !== 'idle') marked = true;
            const pct = g.sign === 'run' || g.sign === 'stop' ? Math.round(progressNow() * 10) / 10 : 0;
            if (g.sign === 'run' || g.sign === 'stop') root.pct = pct;
            const tk = act + ':' + name;
            if (was === g.sign) {
                if (g.sign !== 'run' || !live) continue;

                await (await el.querySelector('.x-risu-nc-fill'))?.setStyle('width', pct + '%');
                if (root.figText.get(tk) !== g.text) {
                    await (await el.querySelector('.x-risu-nc-lbl'))?.setInnerHTML(figLbl(g.text, 'run'));
                    root.figText.set(tk, g.text);
                }
                continue;
            }
            const bar = await el.getParent();
            if (g.sign === 'idle') {
                await el.setStyleAttribute(BTN_STYLE);
                await el.setInnerHTML(ACT_LABEL[act]);
                await bar?.setStyleAttribute(ACT_STYLE);
            } else {

                await el.setStyleAttribute(BTN_STYLE + ';' + FIG_RUN);
                await el.setInnerHTML(figGaugeHtml(pct, g.text, act, g.sign));
                await bar?.setStyleAttribute(ACT_STYLE + ';' + ACT_SHOW);
            }
            root.figText.set(tk, g.text ?? '');
            await el.setClassName(cls.split(/\s+/).filter(c => c && !/^(x-risu-)?nc-s-/.test(c)).concat(g.sign === 'idle' ? [] : ['nc-s-' + g.sign]).join(' '));
        }
        root.figMarked = marked;
    }

    async function paintBusy(force = false) {
        if (st.jobs > 0) startTick(); else stopTick();
        await paintGen(force, true);
        await paintFigs(true);
    }

    async function addPanelButton(d, row) {
        const b = await d.createElement('button');
        await b.setClassName(PANBTN_CLASS);
        await b.setInnerHTML(ICON_SVG.replace('width="100%" height="100%"', 'width="24" height="24"'));
        await b.setStyle('cursor', 'pointer');
        await b.setStyle('flexShrink', '0');
        if (!root.on || !panSel() || await d.querySelector('.nc-panbtn')) return false;
        await row.prepend(b);
        return true;
    }
    async function placeButton() {
        const d = root.doc;
        if (!root.on || !d) return;
        const pan = panSel();

        const gone = await removeButtons(d, [pan]);
        if (pan || gone) {
            const row = await inputRow(d);
            if (row && root.on) {
                let added = false;
                if (pan && !await d.querySelector(pan)) added = await addPanelButton(d, row);
                await tightenButtons(row, added || gone);
            }
        }
        await paintGen();
        await paintFigs();
    }

    async function onRootClick(event) {
        const d = root.doc;
        if (event.button !== 0 || !root.on || !d) return;
        const pb = panSel() ? await d.querySelector('.nc-panbtn') : null;
        if (pb && inRect(await pb.getBoundingClientRect(), event)) return void openPanel().catch(error => console.error(LOG, 'panel', error));

        if (st.set.ubtn !== 'none') {
            const gens = await d.querySelectorAll('.x-risu-nc-gen');
            const n = await gens.length();
            for (let i = 0; i < n; i++) {
                const el = await gens.at(i);
                if (!inRect(await el.getBoundingClientRect(), event)) continue;
                const idx = genIdx(String(await el.getClassName() ?? ''));
                if (Number.isInteger(idx) && idx >= 0) await genClick(idx);
                return;
            }
        }
        if (!st.set.tap) return;

        const acts = await d.querySelectorAll('.x-risu-nc-act-b');
        const n = await acts.length();
        for (let i = 0; i < n; i++) {
            const el = await acts.at(i);
            const r = await el.getBoundingClientRect();
            if (!(r?.width > 0) || !inRect(r, event)) continue;
            const cls = String(await el.getClassName() ?? '');
            const name = /(?:^|\s)x-risu-nc-for-(nc_[a-z0-9_]+)/i.exec(cls)?.[1];
            const act = /(?:^|\s)x-risu-nc-(panel|draw|new|del)(?:\s|$)/.exec(cls)?.[1];
            if (act === 'panel') return void openPanel().catch(error => console.error(LOG, 'panel', error));
            if (name && act) await figAction(act, name, el);
            return;
        }

        await toggleFig(d, event);
    }

    const FIG_ON = 'x-risu-nc-on';
    async function toggleFig(d, event) {
        const figs = await d.querySelectorAll('.x-risu-nc-fig');
        const n = await figs.length();
        for (let i = 0; i < n; i++) {
            const el = await figs.at(i);
            if (await el.hasClass(FIG_ON)) { await el.removeClass(FIG_ON); continue; }
            if (!inRect(await el.getBoundingClientRect(), event)) continue;
            const act = await el.querySelector('.x-risu-nc-act');
            const r = act && await act.getBoundingClientRect();
            if (r && !(r.width > 0)) await el.addClass(FIG_ON);
        }
    }

    async function genClick(idx) {
        try {
            const ci = await api.getCurrentCharacterIndex();
            const chi = await api.getCurrentChatIndex();
            const b = st.busy;
            if (b && b.ci === ci && b.chi === chi && b.idx === idx) { if (!b.stop) cancelAll(); return; }
            if (!(await naiKey()) || !setupDone()) { void rootQueue(() => paintBusy(true)); await openSettings(); return; }
            const chat = await api.getChatFromIndex(ci, chi);
            const msg = chat?.message?.[idx];
            if (msg?.role !== 'char') return;
            const key = msgKeyOf(msg, idx, chat.message);
            if (queued.has(key)) return;
            enqueue({ ci, chi, idx, key, mode: 'new', label: '씬 재구성 중', alertFail: true }).catch(() => {});
        } catch (error) {
            console.error(LOG, 'gen click', error);
        }
    }

    async function startRoot() {
        if (root.on || !needRoot()) return;
        const d = await rootDoc();
        if (!d || root.on || !needRoot()) return;
        root.on = true;
        root.look = '';
        root.pct = -1;
        root.clickId = await d.addEventListener('click', event => void onRootClick(event));

        root.observer = await api.createMutationObserver(() => {
            if (root.timer) return;
            root.timer = setTimeout(() => {
                root.timer = 0;
                void rootQueue(placeButton);
            }, 300);
        });
        const body = await d.querySelector('body');
        if (body) await root.observer.observe(body, { childList: true, subtree: true });
        await placeButton();
    }

    async function stopRoot() {
        root.on = false;
        stopTick();
        clearTimeout(root.timer);
        root.timer = 0;
        try { await root.observer?.disconnect(); } catch {}
        root.observer = null;
        const d = root.doc;
        if (!d) return;
        if (root.clickId) {
            try { await d.removeEventListener('click', root.clickId); } catch {}
            root.clickId = '';
        }
        await removeButtons(d);

        try {
            const row = await inputRow(d);
            if (row) await tightenButtons(row, true);
        } catch {}
        root.kids = '';
    }

    async function syncRoot(key) {
        if (!['tap', 'ubtn', 'panelBtn'].includes(key)) return;
        if (!needRoot()) return rootQueue(stopRoot);
        if (root.on) return rootQueue(placeButton);
        const reopen = !root.asked && ui.root?.isConnected;
        if (reopen) closePanel();
        await rootQueue(startRoot);
        if (reopen) await openPanel();
        else renderNow();
    }

    async function openSettings() {
        await openPanel();
        ui.tab = 'ready';
        ui.side = '';
        renderNow();
    }

    async function drawLatest(alertFail = false) {
        try {
            const ci = await api.getCurrentCharacterIndex();
            const chi = await api.getCurrentChatIndex();
            const chat = await api.getChatFromIndex(ci, chi);
            const idx = lastBotIndex(chat);
            if (idx < 0) { if (alertFail) await api.alert?.('그릴 봇 답변이 없습니다.'); return; }
            if (!(await naiKey())) { await openSettings(); return; }
            const key = msgKeyOf(chat.message[idx], idx, chat.message);
            if (queued.has(key)) return;
            enqueue({ ci, chi, idx, key, mode: 'new', alertFail }).catch(() => {});
        } catch (error) {
            console.error(LOG, 'draw latest', error);
        }
    }

    const armed = { name: '', el: null, timer: 0 };
    const setLabel = async (el, text) => { try { await el.setInnerHTML(text); } catch {} };
    function disarm() {
        clearTimeout(armed.timer);
        const el = armed.el;
        armed.name = '';
        armed.el = null;
        armed.timer = 0;
        if (el) { void setLabel(el, ACT_LABEL.del); void el.setStyle('background', '').catch(() => {}); }
    }
    async function figAction(act, name, el) {
        try {
            const ci = await api.getCurrentCharacterIndex();
            const chi = await api.getCurrentChatIndex();
            const low = name.toLowerCase();

            if (act !== 'del') {
                const b = st.busy;
                if (b && figHit(b.job, ci, chi, act, low)) { if (!b.stop) cancelAll(); return; }
                if ([...jobsOn].some(j => figHit(j, ci, chi, act, low))) return;
            }
            const char = await api.getCharacterFromIndex(ci);
            const chat = char ? await api.getChatFromIndex(ci, chi) : null;
            const list = chat?.message ?? [];
            const idx = list.findIndex(m => String(m?.data ?? '').toLowerCase().includes(`::${low}}}`));
            if (idx < 0) return;
            const key = msgKeyOf(list[idx], idx, list);
            if (act !== 'del' && armed.name) disarm();
            if (queued.has(key)) { await api.alert?.('이 답변은 지금 그리는 중입니다.'); return; }
            if (act === 'del') {
                if (armed.name !== low) {
                    disarm();
                    armed.name = low;
                    armed.el = el;
                    await setLabel(el, '정말 지울까요?');
                    try { await el.setStyle('background', 'rgba(220,38,38,.92)'); } catch {}
                    armed.timer = setTimeout(disarm, 3000);
                    return;
                }

                disarm();
                await removeImage(ci, chi, char, key, idx, low);
                return;
            }
            if (act === 'draw') {
                const rec = (await loadRecs(char.chaId))[key];
                if (!rec?.images?.some(x => x.name.toLowerCase() === low)) {
                    await api.alert?.('이 그림의 기록이 없어 다시 그릴 수 없습니다. 「🎬 씬 재구성」으로 그 답변을 새로 그려 주세요.');
                    return;
                }
                name = rec.images.find(x => x.name.toLowerCase() === low).name;
            } else if (list[idx].role !== 'char') return;
            if (!(await naiKey())) { await openSettings(); return; }

            const fig = { act, name: low };
            const job = act === 'draw'
                ? { ci, chi, idx, key, mode: 'draw', only: name, label: '그림 다시 그리는 중', alertFail: true, fig }
                : { ci, chi, idx, key, mode: 'new', label: '씬 재구성 중', alertFail: true, fig };
            enqueue(job).catch(() => {});
        } catch (error) {
            console.error(LOG, 'fig action', error);
        }
    }

    async function removeImage(ci, chi, char0, key, idx, low) {
        const chat = await api.getChatFromIndex(ci, chi);
        if (!chat) return;
        if (chat.isStreaming) { await api.alert?.('답변이 나오는 중입니다. 끝난 뒤에 다시 눌러 주세요.'); return; }
        const i = findMsg(chat, key, idx);
        if (i < 0) return;
        const m = chat.message[i];
        m.data = String(m.data ?? '').replace(TAG_RE, tag => tag.toLowerCase().includes(`::${low}}}`) ? '' : tag).replace(/\s+$/, '');
        await api.setChatToIndex(ci, chi, chat);
        const recs = await loadRecs(char0.chaId);
        const rec = recs[key];
        if (char0.type !== 'group') {
            const char = await api.getCharacterFromIndex(ci);
            if (char?.chaId === char0.chaId) {
                const before = (char.additionalAssets ?? []).length;
                char.additionalAssets = (char.additionalAssets ?? []).filter(a => String(a?.[0] ?? '').toLowerCase() !== low);
                if (char.additionalAssets.length !== before) await api.setCharacterToIndex(ci, char);
            }
        }
        if (rec) {
            const gone = (rec.images ?? []).filter(x => x.name.toLowerCase() === low);
            rec.images = (rec.images ?? []).filter(x => x.name.toLowerCase() !== low);
            for (const x of gone) thumbs.delete(x.path);
            if (!rec.images.length) delete recs[key];
            await saveRecs(char0.chaId, recs);
        }
        if (ui.root?.isConnected) await refreshView().catch(() => {});
        render();
    }

    const NC_ASSET_RE = /^nc_[a-z0-9]+$/;

    const ncUsed = char => new Set(JSON.stringify({ ...char, additionalAssets: [] }).toLowerCase().match(/nc_[a-z0-9]+/g) ?? []);
    const ncLow = a => String(a?.[0] ?? '').toLowerCase();
    async function goneScan() {
        const v = st.view;
        if (!v || v.group || acs.goneRun) return;
        acs.goneRun = true;
        let found = null;
        try {
            const char = await api.getCharacterFromIndex(v.ci);
            if (char?.chaId === v.chaId) {
                const used = ncUsed(char);
                const recs = await loadRecs(char.chaId);
                const info = new Map();
                for (const rec of Object.values(recs)) for (const x of rec?.images ?? []) info.set(String(x?.name ?? '').toLowerCase(), { title: x.title ?? '', at: rec.at ?? 0, excerpt: rec.excerpt ?? '' });
                const list = (char.additionalAssets ?? []).filter(a => NC_ASSET_RE.test(ncLow(a)) && !used.has(ncLow(a)))
                    .map(a => ({ name: a[0], path: a[1], ...(info.get(ncLow(a)) ?? {}) }));
                list.sort((x, y) => (y.at ?? 0) - (x.at ?? 0));
                found = { chaId: char.chaId, list };
            }
        } catch (error) {
            console.warn(LOG, 'gone', error);
            found = { chaId: v.chaId, list: [], err: String(error?.message ?? error) };
        } finally {
            acs.gone = found ?? { chaId: v.chaId, list: [] };
            acs.goneRun = false;
            render();
        }
    }
    async function goneDelete(names) {
        const v = st.view;
        if (!v || v.group) return 0;
        if (st.busy || jobsOn.size) throw new Error('그리는 중에는 지울 수 없습니다');
        const char = await api.getCharacterFromIndex(v.ci);
        if (char?.chaId !== v.chaId) throw new Error('지금 봇이 바뀌었습니다');

        const used = ncUsed(char);
        const drop = new Set(names.map(n => String(n).toLowerCase()).filter(n => NC_ASSET_RE.test(n) && !used.has(n)));
        const before = (char.additionalAssets ?? []).length;
        char.additionalAssets = (char.additionalAssets ?? []).filter(a => !drop.has(ncLow(a)));
        const n = before - char.additionalAssets.length;
        if (n) await api.setCharacterToIndex(v.ci, char);
        const recs = await loadRecs(char.chaId);
        let changed = false;
        for (const [k, rec] of Object.entries(recs)) {
            if (rec?.group) continue;
            const all = rec?.images ?? [], left = all.filter(x => !drop.has(String(x?.name ?? '').toLowerCase()));
            if (left.length === all.length) continue;
            for (const x of all) if (!left.includes(x)) thumbs.delete(x.path);
            if (left.length) rec.images = left; else delete recs[k];
            changed = true;
        }
        if (changed) await saveRecs(char.chaId, recs);
        console.log(LOG, 'gone', `${char.name}: 지운 답변의 그림 ${n}장을 뺐습니다`);
        return n;
    }

    const AC_EMO = [
        ['default', '기본', '🙂', 'light smile, closed mouth, arms at sides'],
        ['smile', '웃음', '😊', 'smile, open mouth, hand on own hip'],
        ['angry', '분노', '😠', 'angry, furrowed brow, clenched teeth, clenched hand'],
        ['blush', '부끄럼', '😳', 'blush, hands together'],
        ['surprised', '놀람', '😲', 'surprised, wide-eyed, open mouth, hands up'],
        ['thinking', '생각', '🤔', 'thinking, hand on own chin, looking up'],
        ['pout', '뾰로통', '😤', 'pout, puffed cheeks, crossed arms'],
        ['sad', '슬픔', '😞', 'sad, frown, head down, hands clasped'],
        ['crying', '울음', '😢', 'crying, tears, trembling lips, hands to chest'],
        ['calm', '차분', '😌', 'calm, closed mouth, half-closed eyes, hands clasped behind back'],
        ['serious', '진지', '😐', 'serious, expressionless, arms at sides'],
        ['bored', '심드렁', '😑', 'bored, half-closed eyes, sigh, leaning'],
        ['sleepy', '졸림', '😪', 'sleepy, yawning, rubbing eyes, open mouth'],
        ['grin', '씩 웃음', '😁', 'grin, teeth, thumbs up'],
        ['laugh', '폭소', '😆', 'laughing, closed eyes, open mouth, hand on own stomach'],
        ['giggle', '킥킥', '🤭', 'giggling, smile, closed eyes, covering own mouth'],
        ['smug', '의기양양', '😏', 'smug, half-closed eyes, crossed arms, head tilt'],
        ['excited', '신남', '🥳', 'excited, sparkling eyes, open mouth, raised fists'],
        ['proud', '뿌듯', '🏅', 'proud, closed eyes, smile, hand on own chest, chin up'],
        ['relieved', '안도', '😮‍💨', 'relieved, sigh, smile, hand on own chest'],
        ['mischievous', '장난', '😜', 'mischievous, tongue out, one eye closed, v'],
        ['annoyed', '짜증', '😒', 'annoyed, frown, glaring, hand on own hip'],
        ['furious', '격노', '🤬', 'furious, shouting, anger vein, clenched hands, open mouth'],
        ['glare', '노려봄', '👀', 'glaring, narrowed eyes, shaded face, crossed arms'],
        ['disgust', '혐오', '😖', 'disgust, half-closed eyes, frown, leaning back'],
        ['cold', '냉담', '🧊', 'expressionless, cold, half-closed eyes, looking down'],
        ['shy', '수줍음', '☺️', 'shy, blush, looking away, fidgeting'],
        ['flustered', '당황', '😵', 'flustered, wavy mouth, flying sweatdrops, blush, waving hands'],
        ['embarrassed', '민망', '🙈', 'embarrassed, full-face blush, covering face, peeking through fingers'],
        ['lovestruck', '두근', '😍', 'heart-shaped pupils, blush, hands on own cheeks, sparkle'],
        ['shocked', '충격', '😱', 'shocked, constricted pupils, hands on own head, open mouth'],
        ['amazed', '감탄', '🤩', 'sparkling eyes, open mouth, smile, own hands clasped'],
        ['scared', '겁먹음', '😨', 'scared, trembling, sweat, hands up, leaning back'],
        ['nervous', '긴장', '😬', 'nervous, sweat, clenched teeth, fidgeting'],
        ['confused', '갸웃', '😕', 'confused, head tilt, question mark, finger to cheek'],
        ['curious', '호기심', '🧐', 'curious, leaning forward, wide-eyed, hands behind back'],
        ['suspicious', '의심', '🤨', 'suspicious, raised eyebrow, narrowed eyes, side glance'],
        ['determined', '결의', '💪', 'determined, serious, raised fist'],
        ['scheming', '꿍꿍이', '😈', 'evil smile, scheming, shaded face, rubbing hands'],
        ['sulking', '삐짐', '😾', 'sulking, looking away, puffed cheeks, hands behind back'],
        ['tsundere', '새침', '😼', 'tsundere, blush, looking away, crossed arms, closed eyes'],
        ['pleading', '조름', '🥺', 'puppy eyes, teary eyes, own hands clasped, looking up'],
        ['jealous', '질투', '🫤', 'jealous, side glance, puffed cheeks, blush, clenched hands'],
        ['lonely', '쓸쓸', '🥀', 'lonely, downcast eyes, hugging own arms, looking down'],
        ['disappointed', '실망', '😔', 'disappointed, sigh, drooping shoulders, looking down'],
        ['worried', '걱정', '😟', 'worried, furrowed brow, hand on own chest, frown'],
        ['sorry', '미안', '🙇', 'apologetic, looking down, own hands together, sweatdrop'],
        ['sobbing', '오열', '😭', 'sobbing, streaming tears, open mouth, wiping tears'],
        ['moved', '감동', '🥲', 'happy tears, smile, wiping tears with finger'],
    ];

    const AC_OUTFIT_PRE = [
        ['uniform', '교복', 'school uniform'], ['suit', '정장', 'business suit'], ['sport', '운동복', 'sportswear'],
        ['swim', '수영복', 'swimsuit'], ['dress', '파티 드레스', 'party dress'],
    ];
    const AC_COUNT_INFO = {
        1: ['기본', '기본 표정 1장만 먼저 그려 그림체를 봅니다. 특수 에셋은 그리지 않습니다'],
        10: ['에셋 10개', '기본을 포함한 감정 9종과 특수 에셋 1종으로 열 칸을 모두 채웁니다'],
        50: ['에셋 50개', '감정 49종과 특수 에셋 1종, 서로 다른 50장을 그립니다'],
        custom: ['커스텀', '쉼표로 나눈 감정만 그립니다. 「다음」을 누르면 모델이 태그로 옮깁니다'],
    };

    const AC_CUSTOM_MAX = 50;
    const AC_CUSTOM_EX = '예: 웃음, 눈물, 행복';
    const acCustomItems = text => String(text ?? '').split(/[,，、\n]+/).map(x => tidy(x).slice(0, 20)).filter(Boolean).slice(0, AC_CUSTOM_MAX);
    const AC_CUSTOM_SYSTEM = 'The user lists facial expressions or moods for character portraits, separated by commas. For each item, in the same order, write Danbooru tags for NovelAI that show that emotion on one character alone: facial expression first, then one fitting pose or gesture (e.g. "smile, open mouth, hand on own hip"). No hair, eyes, clothes, background or camera tags. key is one short lowercase English word for the emotion (a-z only, e.g. "happy", "crying"). icon is one emoji. ko is the item exactly as the user wrote it. Reply with JSON only: {"emos":[{"ko":"item","key":"word","icon":"emoji","en":"tags"}]}';

    const AC_SPECIAL_DEF = [
        { key: 'hug', ko: '포옹', icon: '🤗', en: 'hugging viewer, pov, upper body, closed eyes, smile, blush', scene: 'hugging' },
        { key: 'headpat', ko: '쓰다듬', icon: '🫳', en: 'headpat, pov, pov hands, closed eyes, smile, blush, upper body', scene: 'head-patting' },
        { key: 'handhold', ko: '손잡기', icon: '🤝', en: 'holding hands, pov, pov hands, smile, blush, upper body', scene: 'hand-holding' },
        { key: 'wink', ko: '윙크', icon: '😉', en: 'one eye closed, v, smile, leaning forward, upper body', scene: 'playful teasing' },
        { key: 'sleep', ko: '잠듦', icon: '😴', en: 'sleeping, closed eyes, lying, pillow, blanket', scene: 'sleeping' },
    ];

    const AC_NOTE_OPEN = '{{// 이매진 에셋}}';
    const AC_NOTE_CLOSE = '{{// 이매진 에셋 끝}}';
    const AC_NOTE_RE = /\{\{\/\/ 이매진 에셋\}\}[\s\S]*?\{\{\/\/ 이매진 에셋 끝\}\}/;
    const AC_LORE_LOOK = name => `이매진 · ${name} 외형`;
    const AC_LORE_ASSET = name => `이매진 · ${name} 에셋`;

    const AC_PER_SEC = 22;
    const AC_SLUG_RE = /^[a-z][a-z0-9]{0,15}$/;
    const AC_KEY_RE = /^[a-z][a-z0-9]{0,15}$/;

    const AC_OKEY_RE = /^[a-z][a-z0-9]*$/;

    const acOutfitKey = (en, used) => acKeyFrom(tidy(String(en ?? '').split(',')[0]), used);

    const AC_CSS = `
.ix-head.fd{align-items:flex-end;padding-bottom:0}
.ix-head.fd .ix-logo,.ix-head.fd .ix-chip,.ix-head.fd .sd,.ix-head.fd .ix-x{margin-bottom:8px}
.md{display:inline-flex;align-self:flex-end;gap:4px;margin-left:8px}
.md button{position:relative;display:inline-flex;align-items:center;gap:6px;height:38px;padding:0 16px;white-space:nowrap;font-size:.88rem;font-weight:700;line-height:1.2;color:#9aa1ad;background:#30343c;border:0;cursor:pointer}
.md button::before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:transparent}
.md button:hover{color:#fff;background:#3a3e47}
.md button.on{color:var(--accent2);background:var(--paper2)}
.md button.on::before{background:var(--accent)}
.md button.m-asset.on{color:#0b766c}
.md button.m-asset.on::before{background:#0d9488}
.md-led{flex:none;width:8px;height:8px;margin-left:2px;border-radius:50%;background:#7c828d;box-shadow:inset 0 0 0 1px rgba(0,0,0,.18)}
.md-led.lit{background:#22c55e;box-shadow:0 0 0 2px rgba(34,197,94,.22),0 0 6px rgba(34,197,94,.75)}
.md button.on .md-led:not(.lit){background:#b4bac4}
.sd{display:inline-flex;gap:2px;margin-left:auto}
.sd button{display:inline-flex;align-items:center;gap:5px;min-height:28px;padding:2px 9px;white-space:nowrap;font-size:.84rem;font-weight:700;line-height:1.2;color:#c3c8d2;background:transparent;border:1px solid transparent;cursor:pointer}
.sd button:hover{color:#fff;background:rgba(255,255,255,.1)}
.sd button.on{color:#23262d;background:#fff;border-color:#fff}
.md small{font-size:.64rem;font-weight:400;opacity:.75}
.ix-head{min-height:44px;padding-top:4px;padding-bottom:4px}
.as-g{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.as-t{position:relative;display:grid;min-width:0;background:#fff;border:1px solid var(--line2)}
.as-t.on{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent);z-index:5}
.as-t.bad{border-color:var(--bad)}
.as-b{position:relative;display:block;width:100%;padding:0;line-height:0;background:none;border:0}
.as-im{position:relative;display:grid;place-items:center;aspect-ratio:2/3;overflow:hidden;line-height:1.2}
.as-im i{font-style:normal;font-size:2rem}
.as-im.ok{background:var(--paper3)}
.as-im img{width:100%;height:100%;object-fit:cover;object-position:top}
.as-im.wait{background:var(--paper2);border-bottom:1px dashed var(--line2)}
.as-im.wait i{opacity:.28;filter:grayscale(1)}
.as-im.bad{background:#fff7f6}
.as-im.bad em{position:absolute;left:0;right:0;bottom:12px;font-style:normal;font-size:.68rem;font-weight:700;text-align:center;color:var(--bad)}
.as-im.cur{background:#1e2127}
.as-im.cur i{opacity:.55}
.as-im.cur em{position:absolute;left:0;right:0;bottom:12px;font-style:normal;font-size:.68rem;font-weight:700;text-align:center;color:#c9cdd6}
.as-im .sh{position:absolute;left:0;right:0;bottom:0;height:4px;overflow:hidden;background:rgba(255,255,255,.12)}
.as-im .sh::after{content:"";position:absolute;inset:0;width:40%;background:var(--accent);animation:as-run 1.1s ease-in-out infinite}
@keyframes as-run{from{transform:translateX(-100%)}to{transform:translateX(250%)}}
.as-t.ok .as-b{cursor:pointer}
.as-t.ok .as-b:hover .as-im{filter:brightness(1.12)}
.bdg{position:absolute;top:5px;left:5px;padding:0 5px;font-size:.62rem;font-weight:700;line-height:1.6;color:#fff;background:var(--accent)}
.bdg.bdg-sp{left:auto;right:5px;background:#c27a12}
.as-cap{display:grid;gap:0;min-width:0;padding:5px 7px 6px;border-top:1px solid var(--line)}
.as-cap b{font-size:.78rem}
.as-cap code{overflow:hidden;font-size:.62rem;color:var(--muted);white-space:nowrap;text-overflow:ellipsis;background:none;padding:0}
.as-menu{position:absolute;z-index:6;left:0;right:auto;top:calc(100% - 6px);bottom:auto;min-width:280px;box-shadow:0 6px 18px rgba(0,0,0,.18)}
.as-menu.up{top:auto;bottom:calc(100% - 6px);box-shadow:0 -6px 18px rgba(0,0,0,.18)}
.as-t:nth-child(5n) .as-menu,.as-t:nth-child(5n-1) .as-menu{left:auto;right:0}
.rf{padding:10px 12px;background:var(--paper2);border:1px solid var(--line)}
.rf .cf-tx p{margin:2px 0 0;font-size:.74rem;color:var(--muted)}
.who{display:flex;flex-wrap:wrap;gap:6px}
.who button{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:5px 12px 5px 6px;background:#fff;border:1px solid var(--line2);cursor:pointer}
.who button.sel{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent);background:var(--soft)}
.who .cc-av{width:30px;height:30px;font-size:.85rem}
.who span{display:grid;text-align:left;line-height:1.25}
.who b{font-size:.86rem}
.who small{font-size:.7rem;color:var(--muted)}
.who small.full{color:var(--good);font-weight:700}
.who button.pk{padding-left:10px}
.pk-b{display:grid;place-items:center;width:18px;height:18px;font-style:normal;font-size:.75rem;font-weight:700;color:#fff;background:#fff;border:1px solid var(--line2)}
.pk.sel .pk-b{background:var(--accent);border-color:var(--accent)}
.who b.pk-nm{display:inline-block;padding:1px 8px;color:#fff;font-size:.84rem;line-height:1.5}
.who button.pk .pk-nm+small{margin-top:2px}
.ofs .of-in{flex:0 1 150px;min-height:44px}
.of-hd{margin:10px 0 6px;font-size:.78rem;font-weight:700;color:var(--muted)}
.ld i{font-style:normal}
.ld i:nth-child(2){animation:ix-ld2 1.2s steps(1,end) infinite}
.ld i:nth-child(3){animation:ix-ld3 1.2s steps(1,end) infinite}
@keyframes ix-ld2{0%{opacity:0}33.3%{opacity:1}}
@keyframes ix-ld3{0%{opacity:0}66.6%{opacity:1}}
.of-hd:first-of-type{margin-top:0}
.spb{display:grid;gap:6px;margin-bottom:12px;padding:10px 12px;background:#fffaf0;border:1px solid var(--line);border-left:3px solid var(--accent)}
.spb-hd{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px}
.spb-hd b{font-size:.88rem}
.spb-hd small{font-size:.72rem;color:var(--muted)}
.spb p{margin:0}
.spc{display:flex;flex-wrap:wrap;align-items:center;gap:6px}
.spc .cf-in{flex:0 1 240px;min-height:32px}
.spg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px}
.spg button{display:flex;align-items:flex-start;gap:7px;min-height:44px;padding:7px 9px;text-align:left;font-size:.82rem;line-height:1.3;color:var(--ink);background:#fff;border:1px solid var(--line2);cursor:pointer}
.spg button:hover:not(.sel){border-color:var(--accent);background:var(--soft)}
.spg button.sel{color:#fff;background:var(--accent);border-color:var(--accent)}
.spg i{flex:none;font-style:normal;font-size:1rem;line-height:1.2}
.spg span{display:grid;gap:1px;min-width:0}
.spg b{font-weight:700;word-break:keep-all;overflow-wrap:anywhere}
.spg small{font-size:.7rem;color:var(--muted);word-break:keep-all}
.spg button.sel small{color:rgba(255,255,255,.8)}
.spc .cf-in.sel{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)}
.ad-set{margin:10px 0 4px}
.ad-set>summary{cursor:pointer;font-size:.84rem;font-weight:700;color:var(--ink)}
.ad-set>summary small{font-weight:400;font-size:.74rem;color:var(--muted)}
.ad-set .cf-card{margin-top:8px}
.er{display:grid;margin-top:8px;border:1px solid var(--line)}
.er-r{display:grid;grid-template-columns:28px minmax(0,150px) minmax(0,1fr) auto;align-items:center;gap:4px 10px;padding:7px 10px;border-top:1px solid var(--paper3)}
.er-r:first-child{border-top:0}
.er-r.sp-r{background:#fffaf0}
.er-i{font-size:1.2rem;text-align:center}
.er-n{display:grid;min-width:0}
.er-n b{font-size:.84rem}
.er-n code{overflow:hidden;font-size:.64rem;color:var(--muted);white-space:nowrap;text-overflow:ellipsis;background:none;padding:0}
.er-p{overflow:hidden;font:.72rem/1.45 ui-monospace,Consolas,monospace;color:#3a3f48;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.bdg-in{margin-left:4px;padding:0 4px;font-size:.62rem;font-weight:700;color:#fff;background:var(--accent);vertical-align:1px}
.bdg-in.bdg-sp{background:#c27a12}
.vw{display:flex;flex-wrap:wrap;gap:4px;margin:2px 0 8px}
.vw button{display:inline-flex;align-items:center;gap:6px;min-height:32px;padding:2px 10px 2px 3px;font-size:.8rem;background:#fff;border:1px solid var(--line2);cursor:pointer}
.vw button.sel{font-weight:700;border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent);background:var(--soft)}
.vw button:disabled{opacity:.5}
.vw .cc-av{width:24px;height:24px;font-size:.72rem}
.vw small{font-size:.68rem;font-weight:400;color:var(--muted)}
.vw.gg{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);gap:4px}
.vw.gg button{position:relative;overflow:hidden;min-height:36px;padding-right:10px}
.vw.gg button>*:not(.gg-f){position:relative}
.vw.gg b{font-weight:inherit;white-space:nowrap}
.vw.gg small{margin-left:auto;white-space:nowrap}
.gg-f{position:absolute;inset:0 auto 0 0;background:color-mix(in srgb,var(--accent) 22%,#fff);transition:width .5s var(--ease-out)}
.vw.gg button.cur .gg-f{background:color-mix(in srgb,var(--accent) 38%,#fff);animation:as-blink 1.4s ease-in-out infinite}
.vw.gg button.cur small{color:var(--accent2);font-weight:700}
.vw.gg button.done .gg-f{background:color-mix(in srgb,var(--good) 30%,#fff)}
.vw.gg button.done small{color:var(--good);font-weight:700}
.vw.gg button:disabled{opacity:1;cursor:default}
@keyframes as-blink{50%{opacity:.35}}
.gn-ta{width:100%;min-height:180px;font-family:inherit;font-size:.78rem;line-height:1.55}
.acnt{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.acnt .cn{position:relative;display:flex;flex-direction:column;gap:4px;padding:12px 12px 0;text-align:left;font:inherit;color:var(--ink);background:#fff;border:1px solid var(--line);border-top:3px solid var(--line);cursor:pointer;transition:border-color .12s,background .12s}
.acnt .cn:hover{border-color:var(--accent)}
.acnt .cn.sel{border-color:var(--accent);background:#f3f6ff;box-shadow:inset 0 0 0 1px var(--accent)}
.acnt .cn:disabled{opacity:.5;cursor:default}
.cn-top{display:flex;align-items:flex-start;justify-content:space-between}
.cn-num{font-size:1.9rem;font-weight:800;line-height:1;color:var(--ink);letter-spacing:-.02em}
.cn.sel .cn-num{color:var(--accent)}
.cn-num small{margin-left:2px;font-size:.8rem;font-weight:700;color:var(--muted)}
.cn-chk{display:grid;place-items:center;width:20px;height:20px;font-style:normal;font-size:.74rem;font-weight:800;color:#fff;border:1.5px solid var(--line);background:#fff}
.cn.sel .cn-chk{background:var(--accent);border-color:var(--accent)}
.cn-t{font-size:.88rem}
.cn-d{font-size:.74rem;line-height:1.45;color:var(--muted);flex:1}
.cn-sum{margin:6px -12px 0;padding:7px 12px;font-size:.74rem;color:var(--muted);border-top:1px dashed var(--line);background:rgba(0,0,0,.02)}
.cn-sum b{color:var(--ink)}
.cn.sel .cn-sum{color:var(--accent);background:rgba(61,90,254,.06)}
.cn.sel .cn-sum b{color:var(--accent)}
.acnt .cn.cu:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.cn-in{display:block;width:100%;min-width:0;height:56px;min-height:34px;max-height:320px;margin-top:2px;padding:5px 8px;font:inherit;font-size:.8rem;line-height:1.5;color:var(--ink);background:#fff;border:1px solid var(--line2);border-radius:0;box-sizing:border-box;resize:vertical}
.cn-in:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 2px rgba(61,90,254,.15)}
.cn-in::placeholder{color:#9aa0ad}
.cn-in:focus::placeholder{color:transparent}
.cn-in:disabled{opacity:.6}
.an-c{display:inline-flex;align-items:center;gap:6px;margin-left:auto;padding:3px 8px;border:1px solid var(--line);font-size:.74rem;color:var(--muted);white-space:nowrap}
.an-c b{color:var(--ink);font-variant-numeric:tabular-nums}
.an-c{position:relative;overflow:hidden;--an:var(--accent);--an-soft:var(--soft)}
.an-c.as{--an:#0d9488;--an-soft:#e6f6f4}
.an-c b.lo{color:var(--bad)}
.an-c .an-sep{display:inline-block;width:1px;height:12px;background:var(--line)}
.an-c .lnk{display:inline-block;text-decoration:none}
.an-c{--an-f:color-mix(in srgb,var(--an) 20%,transparent);background-repeat:no-repeat;background-position:left center;background-size:0% 100%}
.an-c.ld{border-color:var(--an);background-image:linear-gradient(var(--an-f),var(--an-f));animation:an-fill .7s linear forwards}
.an-c.ld .lnk{animation:an-spin .7s linear infinite}
.an-c.dn{animation:an-done 1.4s ease-out}
.an-c.dn b{animation:an-up 1.4s ease-out}
.nl-row{display:flex;justify-content:flex-end;margin:0 0 10px}
@keyframes an-fill{to{background-size:100% 100%}}
@keyframes an-spin{to{transform:rotate(360deg)}}
@keyframes an-done{0%,30%{border-color:var(--an);background-color:var(--an-f)}100%{border-color:var(--line);background-color:transparent}}
@keyframes an-up{0%,50%{color:var(--an)}100%{color:var(--ink)}}
.ix-btn.eg{position:relative;overflow:hidden;background:var(--paper3);border-color:var(--line);color:var(--muted)}
.ix-btn.eg:hover{border-color:var(--accent)}
.eg-t{position:absolute;inset:0;pointer-events:none;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.eg-f{position:absolute;inset:0;background:var(--accent);pointer-events:none}
.eg-w{color:#fff}
.eg-f,.eg-w{animation-name:eg-clip;animation-timing-function:linear;animation-fill-mode:both}
@keyframes eg-clip{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.al-top{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin-bottom:10px}
.al-top .ix-hint{flex:1 1 220px;margin:0}
.al-grp{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}
.al-grp:first-of-type{margin-top:4px;border-top:0;padding-top:0}
.al-hd{display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;margin-bottom:8px}
.al-hd .cc-av{width:30px;height:30px;font-size:.85rem}
.al-hd b{font-size:.95rem}
.al-hd code{font-size:.7rem;color:var(--muted)}
.al-hd small{font-size:.72rem;color:var(--muted)}
.al-hd .gone{padding:0 6px;font-size:.68rem;font-weight:700;color:var(--muted);background:var(--paper3)}
.al-of{margin:10px 0 6px;font-size:.78rem;font-weight:700;color:var(--muted)}
.al-of small{margin-left:6px;font-weight:400}
.al-fix{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:0 0 10px;padding:8px 10px;font-size:.78rem;background:#fffaf0;border:1px solid var(--line);border-left:3px solid #c27a12}
.al-fix span{flex:1 1 240px}
.ac-ov{position:fixed;inset:0;z-index:40;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.5)}
.dlg{width:min(640px,100%);max-height:90vh;overflow:auto;background:#fff;border:1px solid var(--line2)}
.dlg-h{display:flex;align-items:center;gap:8px;padding:8px 8px 8px 14px;color:#fff;background:#23262d}
.dlg-h>span{flex:1;min-width:0;font-weight:700}
.dlg-h>span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.dlg-h code{color:#cfd3da;background:rgba(255,255,255,.1);font-weight:400}
.dlg-b{padding:14px}
.dlg .cc-tags{word-break:break-all}
@media (max-width:600px){
  .as-g{grid-template-columns:repeat(3,minmax(0,1fr))}
  .as-t:nth-child(n) .as-menu{left:0;right:auto}
  .as-t:nth-child(3n) .as-menu{left:auto;right:0}
  .as-menu{min-width:230px}
  .er-r{grid-template-columns:24px minmax(0,1fr) auto}
  .er-p{grid-column:2/-1;grid-row:2}
  .ix-brand{flex-wrap:wrap}
  .ix-head.fd .md{order:3;width:100%;margin-left:0}
  .ix-head.fd .ix-logo,.ix-head.fd .ix-chip,.ix-head.fd .sd{margin-top:6px}
  .ix-head.fd .ix-x{align-self:flex-start;margin-top:6px;margin-bottom:0}
  .sd button{padding:3px 7px}
  .sd .hi{display:none}
  .md~.ix-crumb{display:none}
  .md small{display:none}
  .vw.gg{grid-auto-flow:row;grid-template-columns:1fr}
  .acnt{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:520px){
  .acnt{grid-template-columns:1fr}
  .acnt .cn{display:grid;grid-template-columns:auto 1fr;column-gap:12px;padding:10px 12px 0}
  .cn-top{grid-row:1/3}
  .cn-chk{display:none}
  .cn-sum{grid-column:1/-1}
  .cn-in{grid-column:1/-1;margin-top:6px}
}
/* 3.20.0: 완료 카드 (fn-) · 레퍼런스 확인 (rc-). 직각, 원만 쓴다 */
.fn-card{background:#fff;border:1px solid var(--line);border-top:3px solid var(--good)}
.fn-rise>*{animation:ix-rise .5s var(--ease-out) backwards;animation-delay:calc(var(--d,0s) - var(--fe,0ms))}
.fn-rise>:nth-child(2){--d:.06s}
.fn-rise>:nth-child(3){--d:.12s}
.fn-rise>:nth-child(4){--d:.18s}
.fn-rise>:nth-child(5){--d:.24s}
.fn-rise>:nth-child(n+6){--d:.3s}
.fn-top{display:flex;align-items:center;gap:14px;padding:18px 18px 14px}
.fn-ok{flex:none;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;color:#fff;background:var(--good);animation:fn-pop .55s cubic-bezier(.2,1.5,.4,1) both;animation-delay:calc(0s - var(--fe,0ms))}
.fn-ok svg{display:block;width:26px;height:26px}
.fn-ok path{stroke-dasharray:30;stroke-dashoffset:30;animation:fn-draw .4s ease-out forwards;animation-delay:calc(.3s - var(--fe,0ms))}
.fn-ok.still,.fn-ok.still path{animation:none}
.fn-ok.still path{stroke-dashoffset:0}
@keyframes fn-pop{from{opacity:0;transform:scale(.3)}}
@keyframes fn-draw{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){.fn-ok,.fn-ok path,.fn-rise>*{animation:none!important}.fn-ok path{stroke-dashoffset:0}}
.fn-tt{min-width:0}
.fn-tt b{display:block;font-size:1.12rem;line-height:1.35}
.fn-tt span{display:block;margin-top:2px;font-size:.86rem;color:var(--muted)}
.ix .fn-ck{display:grid;gap:6px;margin:0;padding:12px 18px;list-style:none;font-size:.82rem;background:var(--paper2);border-top:1px solid var(--line)}
.fn-ck li{display:flex;align-items:baseline;gap:8px}
.fn-ck li::before{content:"✓";flex:none;font-weight:800;color:var(--good)}
.fn-ck li.off{color:var(--muted)}
.fn-ck li.off::before{content:"–";color:var(--muted)}
.fn-ck small{margin-left:6px;color:var(--muted)}
.fn-msg{padding:12px 18px 0}
.fn-card>.cf-row{padding:12px 18px;border-top:1px solid var(--line)}
.fn-go{display:flex;flex-wrap:wrap;gap:8px;padding:14px 18px;border-top:1px solid var(--line)}
.fn-go .ix-btn{flex:1 1 180px;min-height:42px;font-size:.9rem}
.fn-fold{border-top:1px solid var(--line)}
.fn-fold>summary{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px;padding:11px 18px;font-size:.84rem;font-weight:700;list-style:none;cursor:pointer}
.fn-fold>summary::-webkit-details-marker{display:none}
.fn-fold>summary small{font-size:.74rem;font-weight:400;color:var(--muted)}
.fn-fold>summary::after{content:"▾";margin-left:auto;color:var(--muted)}
.fn-fold[open]>summary::after{content:"▴"}
.fn-fold>summary:hover{background:var(--paper2)}
.fn-fold>div{padding:4px 18px 16px}
.fn-fold .rz{margin-top:12px}
.rc-pg,.rc-pn{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:4px}
.rc-pg i{display:block;height:8px;background:var(--paper3)}
.rc-pg i.dn{background:var(--good)}
.rc-pn{margin-top:5px;font-size:.72rem;color:var(--muted)}
.rc-pn .dn{font-weight:700;color:var(--good)}
.rc-pn .nx{font-weight:700;color:var(--accent2)}
.ix .rc-h{margin:14px 0 4px;font-size:1.05rem}
.ix .rc-ul{margin:0 0 12px;padding-left:18px;font-size:.82rem}
.rc-ul li+li{margin-top:2px}
.as-g.rc-g{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.rc-g .as-t:nth-child(n) .as-menu{left:0;right:auto}
.rc-g .as-t:nth-child(4n) .as-menu,.rc-g .as-t:nth-child(4n-1) .as-menu{left:auto;right:0}
.rc-tb{display:flex;border-top:1px solid var(--line)}
.rc-tb button{flex:1 1 auto;min-height:34px;padding:0 6px;font-size:.78rem;background:#fff;border:0}
.rc-tb button+button{flex:none;width:36px;border-left:1px solid var(--line)}
.rc-tb button:hover:not(:disabled){background:var(--soft)}
.rc-tb button:disabled{opacity:.45;cursor:not-allowed}
.rc-bar{position:sticky;bottom:0;z-index:7;display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;margin:18px -16px -16px;padding:12px 16px;background:#fff;border-top:1px solid var(--line2);box-shadow:0 -10px 20px -12px rgba(0,0,0,.3)}
.rc-bar .ix-btn{flex:1 1 260px;min-height:46px;font-size:.95rem}
.rc-bar small{font-size:.76rem;color:var(--muted)}
@media (max-width:600px){
  .fn-top{padding:16px 14px 12px}
  .ix .fn-ck,.fn-msg,.fn-card>.cf-row,.fn-go,.fn-fold>summary{padding-left:14px;padding-right:14px}
  .fn-fold>div{padding:4px 14px 14px}
  .as-g.rc-g{grid-template-columns:repeat(2,minmax(0,1fr))}
  .rc-g .as-t:nth-child(n) .as-menu{left:0;right:auto}
  .rc-g .as-t:nth-child(2n) .as-menu{left:auto;right:0}
  .rc-bar{margin:18px -12px -12px;padding:10px 12px}
}
`;

    const AC_HUES = ['#3d5afe', '#c2185b', '#00897b', '#ef6c00', '#7b1fa2', '#2e7d32', '#0277bd', '#6d4c41'];
    const acInitial = s => ([...String(s || '?').trim()][0] ?? '?').toUpperCase();

    const AC_VIEW_DEF = '2::cowboy shot::, standing, looking at viewer';
    const AC_VIEW_OLD = ['cowboy shot, standing, looking at viewer'];
    const AC_AST = () => ({
        picked: null, outfits: null, extra: [], botOutfits: null, count: 10, custom: null, customText: '', special: null, specials: [], why: '', ref: true, view: AC_VIEW_DEF,
        gn: '', gnEdited: false, step: 1, edits: {}, refName: {}, slugs: {}, slugBy: {}, enNames: {}, asked: false, made: [],
        prompts: {},
    });
    const astCache = new Map();
    const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
    async function loadAst(chaId) {
        if (astCache.has(chaId)) return astCache.get(chaId);
        const v = await api.pluginStorage.getItem('nc:ast:' + chaId).catch(() => null);
        const a = { ...AC_AST(), ...(isObj(v) ? v : {}) };

        a.custom = isObj(a.custom) && Array.isArray(a.custom.emos) ? { raw: String(a.custom.raw ?? ''), emos: acCleanEmos(a.custom.emos) } : null;
        if (a.custom && !a.custom.emos.length) a.custom = null;
        a.customText = String(a.customText ?? a.custom?.raw ?? '').slice(0, 1000);
        if (a.count === 'custom' && !a.custom && !(Number(a.step) <= 3 && acCustomItems(a.customText).length)) a.count = 10;
        if (![1, 10, 50, 'custom'].includes(a.count)) a.count = 10;
        for (const k of ['picked', 'outfits', 'botOutfits']) if (a[k] !== null && !Array.isArray(a[k])) a[k] = null;
        for (const k of ['extra', 'specials', 'made']) if (!Array.isArray(a[k])) a[k] = [];
        for (const k of ['edits', 'refName', 'slugs', 'slugBy', 'enNames', 'prompts']) if (!isObj(a[k])) a[k] = {};
        for (const [k, x] of Object.entries(a.prompts)) if (!isObj(x) || !['base', 'neg', 'slot'].every(f => typeof x[f] === 'string')) delete a.prompts[k];
        if (a.special !== null && !(isObj(a.special) && tidy(a.special.ko) && tidy(a.special.en))) a.special = null;
        a.step = Math.min(8, Math.max(1, Math.round(Number(a.step)) || 1));
        a.ref = a.ref !== false;
        a.view = typeof a.view === 'string' && !AC_VIEW_OLD.includes(tidy(a.view)) ? tidy(a.view) : AC_VIEW_DEF;
        a.gnEdited = !!a.gnEdited;
        a.gn = String(a.gn ?? '');
        a.why = String(a.why ?? '');
        a.asked = !!a.asked;
        const usedO = new Set(['base', ...AC_OUTFIT_PRE.map(o => o[0])]), moved = {};
        for (const o of [...(a.botOutfits ?? []), ...a.extra]) if (isObj(o) && AC_KEY_RE.test(o.key ?? '')) usedO.add(o.key);
        for (const o of [...(a.botOutfits ?? []), ...a.extra]) {
            if (!isObj(o) || AC_KEY_RE.test(o.key ?? '')) continue;
            const key = acOutfitKey(o.en, usedO);
            if (typeof o.key === 'string') moved[o.key] = key;
            o.key = key;
        }
        if (a.outfits) a.outfits = a.outfits.map(k => moved[k] ?? k);
        astCache.set(chaId, a);
        return a;
    }
    const saveAst = chaId => { const a = astCache.get(chaId); if (a) save('nc:ast:' + chaId, a); };
    const acAst = () => st.view ? astCache.get(st.view.chaId) ?? null : null;

    const acHave = new Map();
    function acReadHave(char) {
        const m = new Map();
        for (const x of char?.additionalAssets ?? []) if (Array.isArray(x) && /^c_[a-z0-9_]+$/.test(x[0] ?? '')) m.set(x[0], x[1]);
        if (char?.chaId) acHave.set(char.chaId, m);
        return m;
    }
    const acHas = () => acHave.get(st.view?.chaId) ?? new Map();

    const acs = {
        run: null, edit: null, pe: null, asking: false, askErr: '', tr: false, msg: '', msgOk: false, cu: false, cuAt: 0, cuErr: '', cuNeed: false, cuH: '',
        an: null, anAt: 0, anBusy: false, anErr: '', anShow: false, anFlash: false, quota: null, anT0: 0,
        refs: new Map(), times: [], timer: 0, fail: new Map(), menu: '', who: '', outfit: '', adv: false, trErr: '', lw: 'all',
        reopen: 0, reopenCha: '', llmOpen: false,
        sp: false, spAt: 0, spErr: '',
        fOpen: false, mOpen: false, finAt: 0,
    };

    const acCast = () => (st.view?.cast?.list ?? []).filter(e => e && e.on !== false);
    const acHue = e => AC_HUES[Math.max(0, acCast().indexOf(e)) % AC_HUES.length];
    function acPickedIds(a) {
        const list = acCast();
        if (!a.picked) return list.filter(e => e.src !== 'persona').map(e => e.id);
        const want = new Set(a.picked);
        return list.filter(e => want.has(e.id)).map(e => e.id);
    }
    const acPicked = a => { const ids = new Set(acPickedIds(a)); return acCast().filter(e => ids.has(e.id)); };

    const RO_I = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
    const RO_V = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
    const RO_F = ['', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'l', 'l', 'l', 'p', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];

    const RO_LINK = { 1: 'g', 2: 'kk', 4: 'n', 7: 'd', 8: 'r', 16: 'm', 17: 'b', 19: 's', 20: 'ss', 22: 'j', 23: 'ch', 24: 'k', 25: 't', 26: 'p', 27: '' };

    const RO_SUR = { 김: 'kim', 이: 'lee', 박: 'park', 최: 'choi', 정: 'jung', 강: 'kang', 조: 'cho', 윤: 'yoon', 장: 'jang', 임: 'lim', 한: 'han', 오: 'oh', 서: 'seo', 신: 'shin', 권: 'kwon', 황: 'hwang', 안: 'ahn', 송: 'song', 류: 'ryu', 유: 'yoo', 홍: 'hong', 전: 'jeon', 고: 'ko', 문: 'moon', 양: 'yang', 손: 'son', 배: 'bae', 백: 'baek', 허: 'heo', 남: 'nam', 심: 'shim', 노: 'noh', 하: 'ha', 곽: 'kwak', 성: 'sung', 차: 'cha', 주: 'joo', 우: 'woo', 구: 'koo', 민: 'min', 진: 'jin', 나: 'na', 지: 'ji', 채: 'chae', 원: 'won', 천: 'cheon', 방: 'bang', 공: 'kong', 현: 'hyun', 함: 'ham', 변: 'byun', 염: 'yeom', 여: 'yeo', 추: 'choo', 도: 'do', 소: 'so', 석: 'seok', 선: 'sun', 설: 'seol', 마: 'ma', 길: 'gil', 연: 'yeon', 위: 'wi', 표: 'pyo', 명: 'myung', 기: 'ki', 반: 'ban', 왕: 'wang', 금: 'keum', 옥: 'ok', 육: 'yook', 인: 'in', 제: 'je', 모: 'mo', 탁: 'tak', 국: 'kook', 은: 'eun', 용: 'yong', 엄: 'eom' };
    function acRoman(s) {
        const cs = [...String(s ?? '')];
        const syl = c => { const n = c.codePointAt(0) - 0xac00; return n >= 0 && n < 11172 ? [Math.floor(n / 588), Math.floor(n % 588 / 28), n % 28] : null; };
        const sur = cs.length >= 3 && cs.every(c => syl(c)) && RO_SUR[cs[0]];
        let out = '';
        cs.forEach((c, i) => {
            const p = syl(c);
            if (!p) { out += c; return; }
            if (i === 0 && sur) { out += sur; return; }
            const prev = i > 0 && !(i === 1 && sur) ? syl(cs[i - 1]) : null;
            let ini = RO_I[p[0]];
            if (prev?.[2] && p[0] === 11 && prev[2] in RO_LINK) ini = RO_LINK[prev[2]];
            else if (prev?.[2] === 8 && p[0] === 5) ini = 'l';
            const next = syl(cs[i + 1] ?? '');
            const linked = p[2] && next && next[0] === 11 && p[2] in RO_LINK && !(i + 1 === 1 && sur);
            out += ini + RO_V[p[1]] + (linked ? '' : RO_F[p[2]]);
        });
        return out;
    }

    const acAscii = x => { const k = acRoman(x).toLowerCase().replace(/[^a-z0-9]/g, ''); return /^[a-z]/.test(k) ? k : ''; };

    const acHashSlug = e => ('p' + fnv(String(e.id || e.name))).slice(0, 12);
    const acSlugUsed = (a, s) => a.made.some(n => n.startsWith(`c_${s}_`)) || [...acHas().keys()].some(n => n.startsWith(`c_${s}_`));

    const acSlugBase = (a, e) => [a.enNames[e.name], ...(e.aliases ?? []), e.name].map(acAscii).find(Boolean)?.slice(0, 12) || 'person';

    function acSlugs(a) {
        const out = {}, used = new Set();
        const list = acCast();
        for (const e of list) {
            const s = a.slugs[e.id];
            if (s === acHashSlug(e) && !acSlugUsed(a, s)) continue;
            if (AC_SLUG_RE.test(s ?? '') && !used.has(s)) { out[e.id] = s; used.add(s); }
        }

        const ids = new Set(list.map(e => e.id)), gone = new Map();
        for (const [id, s] of Object.entries(a.slugs)) if (!ids.has(id) && AC_SLUG_RE.test(s ?? '') && !used.has(s)) gone.set(s, a.slugBy[s] ?? '');
        for (const e of list) {
            if (out[e.id]) continue;
            const back = [...gone].find(([, name]) => name && name === e.name);
            if (back) { out[e.id] = back[0]; used.add(back[0]); gone.delete(back[0]); continue; }
            const base = acSlugBase(a, e);
            let s = base, n = 2;
            while (used.has(s) || gone.has(s)) s = base.slice(0, 10) + n++;
            out[e.id] = s;
            used.add(s);
        }
        return out;
    }
    const acEnName = (a, e, slug) => a.enNames[e.name] || slug.charAt(0).toUpperCase() + slug.slice(1);
    const acName = (slug, okey, ekey) => `c_${slug}_${okey}_${ekey}`;

    function acKeyFrom(s, used, pre = 'o') {
        const k = acAscii(s) || (pre === 's' ? 'scene' : 'outfit');
        let out = k, n = 2;
        while (used.has(out)) out = k + n++;
        used.add(out);
        return out;
    }

    const AC_BASE_OUTFIT = { key: 'base', ko: '기본 복장', en: 'default outfit', src: '등장인물 탭 그대로', g: 'bot' };

    function acOutfitList(a) {
        const out = [AC_BASE_OUTFIT], seen = new Set(['base']);
        const put = o => {
            if (!o || !AC_OKEY_RE.test(o.key ?? '') || seen.has(o.key) || !tidy(o.en)) return;
            seen.add(o.key);
            out.push(o);
        };
        for (const o of a.botOutfits ?? []) put({ ...o, src: o.src || '봇 설명', g: 'bot' });
        for (const [key, ko, en] of AC_OUTFIT_PRE) put({ key, ko, en, src: '프리셋', g: 'pre' });
        for (const o of a.extra) put({ ...o, src: '직접 추가', g: 'user' });
        return out;
    }
    const acOutfitKeys = a => a.outfits ?? acOutfitList(a).filter(o => o.g === 'bot').map(o => o.key);
    const acOutfits = a => { const keys = new Set(acOutfitKeys(a)); return acOutfitList(a).filter(o => keys.has(o.key)); };

    const acSpecialList = a => a.specials.length ? a.specials : AC_SPECIAL_DEF;

    function acSpecial(a) {
        const s = a.special ?? acSpecialList(a)[0];
        const key = AC_KEY_RE.test(s.key ?? '') && !AC_EMO.some(r => r[0] === s.key) ? s.key : 'special';
        return { key, ko: s.ko, icon: s.icon || '✨', en: s.en, scene: s.scene || key, special: true };
    }

    function acEmos(a) {
        if (a.count === 'custom' && a.custom?.emos.length) return a.custom.emos.map(m => ({ ...m }));
        const rows = AC_EMO.map(([key, ko, icon, en]) => ({ key, ko, icon, en }));
        if (a.count === 1) return [rows[0]];
        return [...rows.slice(0, a.count === 50 ? 49 : 9), acSpecial(a)];
    }

    function acPlan(a, only) {
        const sl = acSlugs(a), os = acOutfits(a), emos = acEmos(a), out = [];
        for (const e of acPicked(a)) {
            if (only && e.id !== only) continue;
            for (const o of os) for (const emo of emos) out.push({ e, slug: sl[e.id], o, emo, name: acName(sl[e.id], o.key, emo.key) });
        }
        return out;
    }
    const acTotal = a => acPicked(a).length * acOutfits(a).length * acEmos(a).length;
    const acDoneOf = (a, e) => { const have = acHas(); return acPlan(a, e.id).filter(t => have.has(t.name)).length; };

    const acWear = (e, o) => k => o.key === 'base' ? baseWear(e, k) : k === 'top' ? o.en : (k === 'bottom' || k === 'shoes') ? '' : baseWear(e, k);
    function acReq(a, e, o, emo, ref, p = acPreset()) {
        const val = acWear(e, o);
        return {
            base: joinTags(countTags([e.type]), dropTags(p.pos, AC_TEXTY), emo.special ? 'solo, simple background, white background' : joinTags('solo', a.view, 'simple background, white background')),
            neg: joinTags(removeTokens(p.neg, ['simple background', 'white background']), guardTags([e.type]), 'speech bubble, text, english text, japanese text, letters, sound effects, onomatopoeia, character name, character sheet', 'comic, multiple panels, panel borders'),
            slots: [{ prompt: joinTags(identTags(e.type, e.look, val), a.edits[`${e.id}|${emo.key}`] ?? emo.en), uc: '', x: 0.5, y: 0.5, kind: 'char', type: e.type, name: e.name }],
            w: 832, h: 1216, panels: 1, useCoords: false, ref, preset: p.id,
        };
    }
    const acPrompt = (a, e, emo) => a.edits[`${e.id}|${emo.key}`] ?? emo.en;

    const acAutoPrompt = (a, t, p = acPreset()) => { const r = acReq(a, t.e, t.o, t.emo, null, p); return { base: r.base, neg: r.neg, slot: r.slots[0].prompt }; };
    function acReqOf(a, t, ref, p) {
        const req = acReq(a, t.e, t.o, t.emo, ref, p), ov = a.prompts[t.name];
        if (ov) { req.base = ov.base; req.neg = ov.neg; req.slots[0].prompt = ov.slot; }
        return req;
    }

    function acSetPrompt(a, t, d) {
        const x = { base: tidy(d.base), neg: tidy(d.neg), slot: tidy(d.slot) }, au = acAutoPrompt(a, t);
        if (x.base === au.base && x.neg === au.neg && x.slot === au.slot) delete a.prompts[t.name]; else a.prompts[t.name] = x;
    }

    function acEmoOf(a, key) {
        const hit = [...acEmos(a), acSpecial(a)].find(m => m.key === key);
        if (hit) return hit;
        const r = AC_EMO.find(x => x[0] === key);
        if (r) return { key, ko: r[1], icon: r[2], en: r[3] };
        const m = (a.custom?.emos ?? []).find(x => x.key === key);
        if (m) return { ...m };
        const s = acSpecialList(a).find(x => x.key === key && tidy(x.en));
        return s ? { key, ko: s.ko, icon: s.icon || '✨', en: s.en, scene: s.scene || key, special: true } : null;
    }

    function acTaskOf(a, e, slug, name) {
        if (!e) return null;
        const hit = acPlan(a).find(t => t.name === name);
        if (hit) return { ...hit, keep: true };
        const m = /^c_[a-z0-9]+_([a-z0-9]+)_([a-z0-9]+)$/.exec(name);
        const o = m && acOutfitList(a).find(x => x.key === m[1]), emo = m && acEmoOf(a, m[2]);
        return o && emo ? { e, slug, o, emo, name, keep: true } : null;
    }

    const AC_ED_BDG = () => h('span', { class: 'bdg-in', title: '에셋 목록에서 직접 고친 프롬프트로 그립니다' }, '고침');
    const AC_TEXTY = ['sound effects', 'onomatopoeia', 'motion lines', 'motion blur', 'speech bubble', 'text'];

    const acRefName = (a, e, slug, o) => {
        const r = a.refName[`${e.id}|${o.key}`];
        const emos = acEmos(a);
        return r && emos.some(m => acName(slug, o.key, m.key) === r) ? r : acName(slug, o.key, emos[0]?.key ?? 'default');
    };

    async function acPng64(path) {
        const data = await api.readImage(path);
        const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
        const bmp = await createImageBitmap(new Blob([bytes], { type: mimeOf(bytes) }));
        const W = 1024, H = 1536, canvas = new OffscreenCanvas(W, H), g = canvas.getContext('2d');
        g.fillStyle = '#000';
        g.fillRect(0, 0, W, H);
        const k = Math.min(W / bmp.width, H / bmp.height), w = Math.round(bmp.width * k), hh = Math.round(bmp.height * k);
        g.drawImage(bmp, (W - w) >> 1, (H - hh) >> 1, w, hh);
        bmp.close?.();
        const u8 = new Uint8Array(await (await canvas.convertToBlob({ type: 'image/png' })).arrayBuffer());
        let s = '';
        for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
        return btoa(s);
    }

    function acRefOf(a, t, chaId) {
        if (!a.ref) return null;
        const rn = acRefName(a, t.e, t.slug, t.o);
        if (rn === t.name) return null;
        const path = acHave.get(chaId)?.get(rn);
        if (!path) return null;
        const k = rn + '|' + path;
        if (!acs.refs.has(k)) {
            const p = acPng64(path);
            acs.refs.set(k, p);
            p.catch(() => acs.refs.delete(k));
        }
        return acs.refs.get(k);
    }

    function acEnqueue(fn) {
        const p = queue.then(fn);
        queue = p.catch(() => {});
        return p;
    }
    const acAvg = () => acs.times.length ? acs.times.reduce((x, y) => x + y, 0) / acs.times.length : AC_PER_SEC;
    const fmtLeft = s => s < 60 ? `${Math.round(s)}초` : s < 3600 ? `${Math.round(s / 60)}분` : `${Math.round(s / 3600)}시간`;
    function acStart(a, tasks, single = false) {
        const v = st.view;
        if (acs.run || acs.cu || !v || !tasks.length) return false;

        const sl = acSlugs(a);
        for (const e of acPicked(a)) { a.slugs[e.id] = sl[e.id]; a.slugBy[sl[e.id]] = e.name; }
        saveAst(v.chaId);

        if (a.ref) {
            const gk = t => `${t.e.id}|${t.o.key}`, first = new Map();
            tasks.forEach((t, i) => { if (!first.has(gk(t))) first.set(gk(t), i); });
            const isRef = t => acRefName(a, t.e, t.slug, t.o) === t.name ? 0 : 1;
            tasks = [...tasks].sort((x, y) => first.get(gk(x)) - first.get(gk(y)) || isRef(x) - isRef(y));
        }

        let refOnly = false;

        const hv = acHas();
        if (a.ref && !single && tasks.every(t => !hv.has(t.name))) {
            const refs = tasks.filter(t => acRefName(a, t.e, t.slug, t.o) === t.name);
            if (refs.length && refs.length < tasks.length) { tasks = refs; refOnly = true; }
        }
        const run = {
            stop: false, tasks, done: 0, n: tasks.length, curAt: Date.now(), chaId: v.chaId, ci: v.ci, cur: tasks[0], first: true, single, ended: '',
            p: acPreset(), model: st.set.model, refOnly,
        };
        run.halt = new Promise(resolve => { run.onStop = resolve; });
        acs.run = run;
        acs.msg = '';
        acs.menu = '';
        acs.who = tasks[0].e.id;
        acs.outfit = tasks[0].o.key;
        clearInterval(acs.timer);
        acs.timer = setInterval(acTick, 1000);
        void acEnqueue(() => acStep(a, run));
        renderNow();
        return true;
    }
    function acStop() {
        const run = acs.run;
        if (!run || run.stop) return;
        run.stop = true;
        run.onStop();
        renderNow();
    }
    async function acStep(a, run) {
        const t = run.tasks[run.done];
        if (run.stop) { run.ended = 'stop'; return acEnd(a, run); }
        if (!t) return acEnd(a, run);
        try {
            const ci = await api.getCurrentCharacterIndex();
            const now = await api.getCharacterFromIndex(ci);
            if (now?.chaId !== run.chaId) throw Object.assign(new Error('봇이 바뀌어 멈췄습니다. 이 봇의 채팅으로 돌아와 애드 에셋을 다시 누르면 남은 칸부터 그립니다.'), { moved: true });
            run.cur = t;
            run.curAt = Date.now();
            render();
            let ref = null;
            try { ref = await acRefOf(a, t, run.chaId); } catch (error) {
                console.warn(LOG, 'asset ref', error);
                acs.msg = `레퍼런스 그림을 읽지 못해 ${t.e.name} · ${t.emo.ko} 칸은 레퍼런스 없이 그립니다: ${error?.message ?? error}`;
                acs.msgOk = false;
            }
            if (run.stop) throw stopError();
            const work = callNai(naiBody(acReqOf(a, t, ref, run.p), randSeed(), { ...st.set, model: run.model }), () => run.stop);
            work.catch(() => {});
            let bytes = await Promise.race([work, run.halt]);
            if (run.stop) throw stopError();
            let ext = isWebp(bytes) ? 'webp' : 'png';
            if (st.set.webp && ext === 'png') { const w = await toWebp(bytes); if (w) { bytes = w; ext = 'webp'; } }
            const path = await api.saveAsset(bytes);
            await acCommit(a, run, t, path, ext);
            if (run.first) { run.first = false; void setArtistThumb(run.p.id, bytes, path); }
            acs.fail.delete(t.name);
            acs.times.push((Date.now() - run.curAt) / 1000);
            if (acs.times.length > 16) acs.times.shift();
            run.done++;
            const nx = run.tasks[run.done];
            if (nx && nx.e.id !== t.e.id) {
                const n = run.tasks.filter(x => x.e.id === t.e.id).length;
                acs.msg = `${t.e.name} ${n}장을 넣고 로어북 두 항목을 썼습니다. 이어서 ${nx.e.name}을(를) 그립니다.`;
                acs.msgOk = true;
            }
            if (nx && acs.who === t.e.id) { acs.who = nx.e.id; acs.outfit = nx.o.key; }
        } catch (error) {
            if (error?.isStop || run.stop) { run.ended = 'stop'; return acEnd(a, run); }
            console.warn(LOG, 'asset', error);
            const msg = String(error?.message ?? error);
            if (!error?.moved) acs.fail.set(t.name, msg);
            acs.msg = error?.moved ? msg : `${t.e.name} · ${t.o.ko} · ${t.emo.ko} 그림을 그리지 못했습니다: ${msg}`;
            acs.msgOk = false;
            run.ended = 'error';
            return acEnd(a, run);
        }
        if (run.stop) { run.ended = 'stop'; return acEnd(a, run); }
        void acEnqueue(() => acStep(a, run));
        render();
    }
    async function acEnd(a, run) {
        if (acs.run === run) { acs.run = null; clearInterval(acs.timer); acs.timer = 0; }
        if (run.ended === 'stop') {
            acs.msg = `멈췄습니다. 그린 ${run.done}장은 봇 에셋에 남겨 두었습니다. 애드 에셋을 다시 누르면 남은 칸부터 그립니다.`;
            acs.msgOk = false;
        } else if (!run.ended && run.refOnly) {

            acs.msg = '';
            acs.msgOk = true;
        } else if (!run.ended) {
            let note = '';
            try { note = await acSyncNote(a, run.ci, run.chaId); } catch (error) { console.warn(LOG, 'note', error); }
            const names = [...new Set(run.tasks.map(t => t.e.name))];
            const hv = acHave.get(run.chaId) ?? new Map(), all = acPlan(a).every(t => hv.has(t.name));
            acs.msg = run.single ? `${run.tasks[0].name}을(를) 다시 그렸습니다.`
                : all ? ''
                : `애드 에셋을 마쳤습니다. ${names.join(' · ')} ${names.length}명, ${run.n}장을 봇에 넣고 인물마다 로어북 「외형」 · 「에셋」을 썼습니다.`;
            if (note === 'put' && acs.msg && !run.single) acs.msg += ' 글로벌노트에 에셋 목록을 넣었습니다.';
            if (all && !run.single) acs.finAt = Date.now();
            acs.msgOk = true;
        }
        acs.anAt = 0;
        void acAnlas();
        renderNow();
    }

    async function acCommit(a, run, t, path, ext) {
        const char = await api.getCharacterFromIndex(run.ci);
        if (char?.chaId !== run.chaId) throw Object.assign(new Error('봇이 바뀌어 그림을 넣지 못했습니다. 이 봇의 채팅에서 다시 눌러 주세요.'), { moved: true });
        const drop = new Set([t.name]);

        if (t.emo.special && !t.keep) {
            const pre = `c_${t.slug}_${t.o.key}_`;
            const keep = new Set([...AC_EMO.map(r => r[0]), ...(a.custom?.emos ?? []).map(m => m.key)]);
            for (const n of a.made) if (n.startsWith(pre) && !keep.has(n.slice(pre.length))) drop.add(n);
        }
        const gone = (char.additionalAssets ?? []).filter(x => drop.has(x?.[0])).map(x => x[1]);

        char.additionalAssets = acSwapIn(char.additionalAssets ?? [], x => x?.[0], drop, t.name, [t.name, path, ext]);
        const made = acSwapIn(a.made, n => n, drop, t.name, t.name);
        acLore(char, a, t.e, t.slug, made);
        await api.setCharacterToIndex(run.ci, char);
        acReadHave(char);
        a.made = made;
        for (const [k, n] of Object.entries(a.refName)) if (drop.has(n) && n !== t.name) delete a.refName[k];
        for (const p of gone) if (p !== path) thumbs.delete(p);
        saveAst(run.chaId);
    }

    function acSwapIn(list, keyOf, drop, name, item) {
        let at = list.findIndex(x => keyOf(x) === name);
        if (at < 0) at = list.findIndex(x => drop.has(keyOf(x)));
        const out = [];
        let pos = -1;
        list.forEach((x, i) => {
            if (i === at) pos = out.length;
            if (!drop.has(keyOf(x))) out.push(x);
        });
        out.splice(pos < 0 ? out.length : pos, 0, item);
        return out;
    }

    function acLore(char, a, e, slug, made = a.made) {
        const lore = Array.isArray(char.globalLore) ? char.globalLore : (char.globalLore = []);
        const pre = `c_${slug}_`;
        const mine = new Set([...made, ...acPlan(a, e.id).map(t => t.name)]);
        const names = (char.additionalAssets ?? []).map(x => x?.[0]).filter(n => typeof n === 'string' && n.startsWith(pre) && mine.has(n));
        const comments = [AC_LORE_LOOK(e.name), AC_LORE_ASSET(e.name)];
        if (!names.length) {
            char.globalLore = lore.filter(x => !comments.includes(x?.comment));
            return;
        }
        const rows = WEAR.map(([k]) => [k, baseWear(e, k)]);
        rows.splice(LOOK_AT, 0, ['look', tidy(e.look)]);
        const okKo = new Map(acOutfitList(a).map(o => [o.key, o.ko]));
        const emKo = new Map([...AC_EMO.map(r => [r[0], r[1]]), ...(a.custom?.emos ?? []).map(m => [m.key, m.ko]), ...acSpecialList(a).map(s => [s.key, s.ko]), [acSpecial(a).key, acSpecial(a).ko]]);
        const list = names.map(n => { const [ok, ek] = n.slice(pre.length).split('_'); return `${n} = ${okKo.get(ok) ?? ok} · ${emKo.get(ek) ?? ek}`; });
        const contents = [
            `[${e.name} 외형 · 이매진이 고정]\n` + rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n'),
            `[${e.name} 에셋] 장면의 감정에 맞는 그림 하나를 {{image::c_${slug}_복장_감정}} 꼴로 넣는다.\n` + list.join('\n'),
        ];

        const off = st.set.ptOff.includes(char.chaId);
        comments.forEach((comment, i) => {
            if (off && i === 1) return;
            const ent = { key: `${e.name}, ${slug}`, secondkey: '', insertorder: 100, comment, content: contents[i], mode: 'normal', alwaysActive: false, selective: false, useRegex: false };
            const at = lore.findIndex(x => x?.comment === comment);
            if (at >= 0) lore[at] = { ...lore[at], ...ent }; else lore.push(ent);
        });
        if (off) char.globalLore = lore.filter(x => x?.comment !== comments[1]);
    }

    async function acSyncOff(a, ci, chaId) {
        const char = await api.getCharacterFromIndex(ci);
        if (char?.chaId !== chaId) return null;
        const sl = acSlugs(a);
        let lore = 0;
        for (const e of acCast()) {
            const slug = sl[e.id];
            if (!slug || !a.made.some(n => n.startsWith(`c_${slug}_`))) continue;
            acLore(char, a, e, slug);
            lore++;
        }
        const note = acNoteInto(char, a);
        if (lore || note === 'put' || note === 'cut') await api.setCharacterToIndex(ci, char);
        return { lore, note };
    }

    async function acDelete(a, name, e, slug, ci, chaId) {
        const char = await api.getCharacterFromIndex(ci);
        if (char?.chaId !== chaId) throw new Error('봇이 바뀌어 지우지 않았습니다.');
        const gone = (char.additionalAssets ?? []).filter(x => x?.[0] === name).map(x => x[1]);
        char.additionalAssets = (char.additionalAssets ?? []).filter(x => x?.[0] !== name);
        const made = a.made.filter(n => n !== name);
        acLore(char, a, e, slug, made);
        const note = acNoteInto(char, a);
        await api.setCharacterToIndex(ci, char);
        acReadHave(char);
        a.made = made;
        delete a.prompts[name];
        for (const [k, n] of Object.entries(a.refName)) if (n === name) delete a.refName[k];
        for (const p of gone) thumbs.delete(p);
        saveAst(chaId);
        return { note };
    }

    async function acRename(a, e, from, ci, chaId) {
        const char = await api.getCharacterFromIndex(ci);
        if (char?.chaId !== chaId) throw new Error('봇이 바뀌어 이름을 바꾸지 않았습니다.');
        if (acs.run) throw new Error('그리는 중에는 이름을 바꾸지 않습니다.');
        const assets = char.additionalAssets ?? [];
        const taken = new Set(Object.entries(acSlugs(a)).filter(([id]) => id !== e.id).map(([, s]) => s));
        for (const s of [...Object.values(a.slugs), ...Object.keys(a.slugBy)]) if (s !== from) taken.add(s);
        const busy = s => taken.has(s) || assets.some(x => typeof x?.[0] === 'string' && x[0].startsWith(`c_${s}_`));
        const base = acSlugBase(a, e);
        let to = base, n = 2;
        while (busy(to)) to = base.slice(0, 10) + n++;
        const oldPre = `c_${from}_`, newPre = `c_${to}_`;
        const ren = x => typeof x === 'string' && x.startsWith(oldPre) ? newPre + x.slice(oldPre.length) : x;
        let cnt = 0;
        for (const x of assets) if (Array.isArray(x) && typeof x[0] === 'string' && x[0].startsWith(oldPre)) { x[0] = ren(x[0]); cnt++; }
        const made = a.made.map(ren);
        a.slugs[e.id] = to;
        delete a.slugBy[from];
        a.slugBy[to] = e.name;
        for (const [k, nm] of Object.entries(a.refName)) a.refName[k] = ren(nm);
        for (const k of Object.keys(a.prompts)) if (k.startsWith(oldPre)) { a.prompts[ren(k)] = a.prompts[k]; delete a.prompts[k]; }
        if (a.gnEdited) {
            const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
            a.gn = a.gn.split(oldPre).join(newPre).split(`${cap(from)} (`).join(`${acEnName(a, e, to)} (`);
        }
        acLore(char, a, e, to, made);
        const note = acNoteInto(char, a);
        await api.setCharacterToIndex(ci, char);
        acReadHave(char);
        a.made = made;
        for (const [k, msg] of [...acs.fail]) if (k.startsWith(oldPre)) { acs.fail.delete(k); acs.fail.set(ren(k), msg); }
        saveAst(chaId);
        return { to, n: cnt, note };
    }

    const acMine = (a, e, slug) => new Set([...a.made, ...acPlan(a, e.id).map(t => t.name)].filter(n => n.startsWith(`c_${slug}_`)));

    const acMineAll = a => new Set([...a.made, ...acPlan(a).map(t => t.name)]);

    async function acClearAll(a, ci, chaId) {
        const char = await api.getCharacterFromIndex(ci);
        if (char?.chaId !== chaId) throw new Error('봇이 바뀌어 지우지 않았습니다.');
        const mine = acMineAll(a);
        const before = (char.additionalAssets ?? []).length;
        const gone = (char.additionalAssets ?? []).filter(x => mine.has(x?.[0])).map(x => x[1]);
        char.additionalAssets = (char.additionalAssets ?? []).filter(x => !mine.has(x?.[0]));

        const ours = x => typeof x?.comment === 'string' && /^이매진 · .+ (외형|에셋)$/.test(x.comment);
        const lore = Array.isArray(char.globalLore) ? char.globalLore : [];
        const loreN = lore.filter(ours).length;
        char.globalLore = lore.filter(x => !ours(x));
        const note = acNoteInto(char, a) === 'cut';
        await api.setCharacterToIndex(ci, char);
        acReadHave(char);
        a.made = [];
        for (const k of Object.keys(a.prompts)) if (mine.has(k)) delete a.prompts[k];
        for (const [k, n] of Object.entries(a.refName)) if (mine.has(n)) delete a.refName[k];
        for (const p of gone) thumbs.delete(p);
        saveAst(chaId);
        return { n: before - char.additionalAssets.length, lore: loreN, note };
    }

    function acNoteText(a) {
        const cs = acPicked(a), os = acOutfits(a), emos = acEmos(a), sl = acSlugs(a);
        if (!cs.length || !os.length) return '';
        const sp = emos.some(m => m.special) ? acSpecial(a) : null;
        const pl = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

        const exE = a.count === 'custom' ? emos.slice(0, 4).map(m => m.key) : a.count === 1 ? ['default'] : ['smile', 'surprised', 'pout', 'thinking'];
        const ex = cs.map((e, i) => `{{image::${acName(sl[e.id], os[(i + 1) % os.length].key, exE[i % exE.length])}}}`).join(' · ');
        const L = [
            '##### Emotion portraits',
            "- Show 1-3 portraits of characters who appear in the scene per response. Put {{image::ASSET}} on the line right before that character's first line of dialogue. ASSET is c_KEY_OUTFIT_EMOTION and must be copied exactly from the asset list below. Never make up a name that is not in the list.",
            emos.length === 1 ? `- Each character has only one portrait per outfit. Always use ${emos[0].key} as EMOTION. Example: ${ex}`
                : `- Pick EMOTION from the facial expression of that line. Vary it by character and by scene, and do not repeat a single emotion. Examples: ${ex}`,
            os.length > 1 ? '- Pick OUTFIT to fit the scene and place, and keep it until the character changes clothes.' : `- Every portrait shows the ${os[0].en}.`,
        ];
        if (sp) L.push(`- Use ${sp.key} only in ${sp.scene} scenes.`);
        L.push(`###### Asset list (${cs.length * os.length * emos.length}: ${pl(cs.length, 'character')} × ${pl(os.length, 'outfit')} × ${pl(emos.length, 'emotion')})`);
        for (const e of cs) {
            const en = acEnName(a, e, sl[e.id]);
            for (const o of os) L.push(`- ${en === e.name ? en : `${en} (${e.name})`}, ${o.en}: ${emos.map(m => acName(sl[e.id], o.key, m.key)).join(' · ')}`);
        }
        return L.join('\n');
    }
    const acNoteNow = a => a.gnEdited ? a.gn : acNoteText(a);

    function acNoteInto(char, a) {
        if (!char || st.view?.chaId !== char.chaId) return '';

        if (st.set.ptOff.includes(char.chaId)) return acCutNote(char) ? 'cut' : '';
        const have = new Set((char.additionalAssets ?? []).map(x => x?.[0]));
        const plan = acPlan(a), text = acNoteNow(a);
        if (plan.length && plan.every(t => have.has(t.name)) && tidy(text)) {
            const block = `${AC_NOTE_OPEN}\n${text}\n${AC_NOTE_CLOSE}`;
            const cur = String(char.replaceGlobalNote ?? '');
            const next = AC_NOTE_RE.test(cur) ? cur.replace(AC_NOTE_RE, () => block)
                : (cur.trim() ? cur.replace(/\s*$/, '\n') : '{{original}}\n') + block;
            if (next === cur) return 'same';
            char.replaceGlobalNote = next;
            return 'put';
        }
        return acCutNote(char) ? 'cut' : '';
    }
    async function acSyncNote(a, ci, chaId) {
        const char = await api.getCharacterFromIndex(ci);
        if (char?.chaId !== chaId) return '';
        const r = acNoteInto(char, a);
        if (r === 'put' || r === 'cut') await api.setCharacterToIndex(ci, char);
        return r;
    }

    function acCutNote(char) {
        const cur = String(char.replaceGlobalNote ?? '');
        if (!AC_NOTE_RE.test(cur)) return false;
        const rest = cur.replace(AC_NOTE_RE, '').replace(/\n{3,}/g, '\n\n').trim();
        char.replaceGlobalNote = rest === '{{original}}' ? '' : rest;
        return true;
    }

    const AC_ASK_SYSTEM = `You read a roleplay bot (description, lorebook, user persona) and plan standalone character portraits for NovelAI.
Reply with one JSON object only, no other text:
{"outfits":[{"ko":"Korean name of the outfit","en":"Danbooru tags for the whole outfit","src":"where you found it, in Korean (e.g. 봇 설명, 로어북 · 연구소)"}],
 "specials":[{"ko":"short Korean noun phrase for the action, at most 8 Korean characters (e.g. 악기 연주, 수술, 노래)","icon":"one emoji","en":"Danbooru tags for the action, pose, expression and held props","scene":"short English action name (e.g. playing violin)","src":"where you found it, in Korean"}],
 "names":[{"name":"character name exactly as listed","en":"English name in ASCII letters"}],
 "why":"one Korean sentence on why you picked these special scenes"}
Rules:
- outfits: up to 4 distinct outfits the listed characters wear in this story, other than their everyday default outfit. Use [] if none.
- specials: exactly 5 signature actions of the character that fit this bot (e.g. playing an instrument, performing surgery, singing, sword fighting, headpat, hug). Each one is something the character does, not a place. Tags describe one character alone; use pov for interaction with the viewer. Do not describe hair, eyes or clothes. Never name a place, room, building, background or scenery (no stage, hospital, operating room, classroom, street, indoors, outdoors); the image has a plain white background.
- names: one entry per listed character. Use the romanized name if there is no English name.`;

    const AC_REGEN_SYSTEM = `You write NovelAI (Danbooru tag) prompts for one standalone character portrait on a plain white background.
Reply with one JSON object only, no other text: {"tags":"comma-separated Danbooru tags"}
Rules:
- 4 to 8 lowercase English Danbooru tags in ASCII: facial expression, pose, hand gesture and held props only.
- The character's look and outfit are already in the prompt. Never describe hair, eyes, face shape, body or clothes.
- Never name a place, room, building, background or scenery (no stage, hospital, operating room, classroom, street, indoors, outdoors).
- Make a clearly different variant from the previous tags, and do not copy the pose of the other emotions listed.`;
    async function acRegenTags(a, ed) {
        if (ed.busy) return;
        const e = acCast().find(x => x.id === ed.cid), emo = acEmos(a).find(x => x.key === ed.ekey);
        if (!e || !emo) return;
        const o = acOutfitList(a).find(x => x.key === ed.okey) ?? AC_BASE_OUTFIT;
        ed.busy = true;
        ed.err = '';
        renderNow();
        try {
            const others = acEmos(a).filter(m => m.key !== emo.key && !m.special).slice(0, 12).map(m => `- ${m.ko}: ${acPrompt(a, e, m)}`).join('\n');
            const user = [
                `# CHARACTER\n${e.name} (${e.type || 'girl'})`,
                `# FIXED LOOK (already in the prompt)\n${identTags(e.type, e.look, acWear(e, o)).filter(Boolean).join(', ')}`,
                emo.special
                    ? `# SPECIAL ACTION\n${emo.ko} (${emo.scene || emo.key}). Keep this action. Framing tags such as upper body or pov are allowed.`
                    : `# EMOTION\n${emo.ko} (${emo.key}). Do not add framing tags (portrait, upper body, cowboy shot, full body); the app adds the view.`,
                `# PREVIOUS TAGS\n${ed.draft ?? acPrompt(a, e, emo)}`,
                others ? `# OTHER EMOTIONS OF THIS CHARACTER\n${others}` : '',
            ].filter(Boolean).join('\n\n');
            const res = parseJson(await requestModel(AC_REGEN_SYSTEM, user, true, st.set.acLlm), 'tags');
            const tags = tidy(isObj(res) ? res.tags : '').toLowerCase().slice(0, 200);
            if (!tags || !/^[\x20-\x7e]+$/.test(tags)) throw new Error('모델 답에서 영어 태그를 찾지 못했습니다.');
            if (acs.edit !== ed) return;
            ed.draft = tags;
        } catch (error) {
            console.warn(LOG, 'asset regen', error);
            if (acs.edit === ed) ed.err = String(error?.message ?? error);
        } finally {
            ed.busy = false;
            if (acs.edit === ed) renderNow();
        }
    }
    async function acAskBot(a, char) {
        if (acs.asking) return;
        const v = st.view;
        acs.asking = true;
        acs.askAt = Date.now();
        acs.askErr = '';
        render();
        try {
            const cs = acPicked(a);
            const { text } = await botContext(char);
            const user = `${text}\n\n# CHARACTERS\n${cs.map(e => `- ${e.name}${e.aliases?.length ? ` (${e.aliases.join(', ')})` : ''}`).join('\n')}`;
            const res = parseJson(await requestModel(AC_ASK_SYSTEM, user, true, st.set.acLlm), 'specials');
            if (!isObj(res)) throw new Error('모델 답에서 JSON 을 찾지 못했습니다.');
            const ascii = s => /^[\x20-\x7e]+$/.test(s);
            const usedO = new Set(['base', ...AC_OUTFIT_PRE.map(o => o[0]), ...a.extra.map(o => o.key)]);
            a.botOutfits = (Array.isArray(res.outfits) ? res.outfits : []).slice(0, 4)
                .map(o => ({ ko: tidy(o?.ko).slice(0, 20), en: tidy(o?.en).toLowerCase().slice(0, 160), src: tidy(o?.src).slice(0, 30) }))
                .filter(o => o.ko && o.en && ascii(o.en))
                .map(o => ({ ...o, key: acOutfitKey(o.en, usedO) }));
            const usedS = new Set(AC_EMO.map(r => r[0]));
            const sps = (Array.isArray(res.specials) ? res.specials : [])
                .map(s => ({ ko: tidy(s?.ko).slice(0, 20), icon: [...tidy(s?.icon)].slice(0, 2).join(''), en: tidy(s?.en).toLowerCase().slice(0, 200), scene: tidy(s?.scene).toLowerCase().slice(0, 40), src: tidy(s?.src).slice(0, 30) }))
                .filter(s => s.ko && s.en && ascii(s.en) && (!s.scene || ascii(s.scene)))
                .slice(0, 5)
                .map(s => ({ ...s, icon: s.icon || '✨', scene: s.scene || s.en.split(',')[0], key: acKeyFrom(s.scene || s.en, usedS, 's') }));
            if (!sps.length) throw new Error('특수 장면 후보를 받지 못했습니다.');
            a.specials = sps;
            if (a.special && !a.special.custom) a.special = null;
            for (const n of Array.isArray(res.names) ? res.names : []) {
                const name = tidy(n?.name), en = tidy(n?.en);
                if (name && /^[A-Za-z][A-Za-z0-9 .'-]{0,30}$/.test(en)) a.enNames[name] = en;
            }
            a.why = tidy(res.why).slice(0, 200);
        } catch (error) {
            console.warn(LOG, 'asset ask', error);
            acs.askErr = String(error?.message ?? error);
        }
        a.asked = true;
        acs.asking = false;
        if (v) saveAst(v.chaId);
        render();
    }

    const AC_TR_SYSTEM = {
        outfit: 'Translate the outfit name into Danbooru tags for NovelAI that describe the whole outfit (e.g. "school uniform, pleated skirt"). Reply with JSON only: {"en":"tags"}',
        scene: 'Turn the scene, action or emotion name into Danbooru tags for NovelAI that describe one character alone in that scene: pose, facial expression and props, no hair, eyes or clothes. Use pov for interaction with the viewer. Reply with JSON only: {"en":"tags","scene":"short English scene name","icon":"one emoji"}',
    };
    async function acTranslate(text, what) {
        if (/^[\x20-\x7e]+$/.test(text)) return { en: text.toLowerCase(), scene: text.toLowerCase(), icon: '' };
        const res = parseJson(await requestModel(AC_TR_SYSTEM[what], text, true, st.set.acLlm), 'en');
        const en = tidy(res?.en).toLowerCase().slice(0, 200);
        if (!en || !/^[\x20-\x7e]+$/.test(en)) throw new Error('태그로 옮기지 못했습니다.');
        const scene = tidy(res?.scene).toLowerCase().slice(0, 40);
        return { en, scene: /^[\x20-\x7e]+$/.test(scene) ? scene : '', icon: [...tidy(res?.icon)].slice(0, 2).join('') };
    }

    function acCleanEmos(list) {
        const used = new Set(['special']), out = [];
        for (const m of Array.isArray(list) ? list : []) {
            if (!isObj(m)) continue;
            const ko = tidy(m.ko).slice(0, 20), en = tidy(m.en).toLowerCase().slice(0, 200);
            if (!ko || !en || !/^[\x20-\x7e]+$/.test(en)) continue;

            const opts = [AC_KEY_RE.test(m.key ?? '') ? m.key : acAscii(m.key), acAscii(en.split(',')[0]), acAscii(ko), 'emo'].map(k => (k || '').slice(0, 14)).filter(Boolean);
            const want = opts.find(k => !used.has(k)) ?? opts[0];
            let key = want, n = 2;
            while (used.has(key)) key = want.slice(0, 13) + n++;
            used.add(key);
            out.push({ key, ko, icon: [...tidy(m.icon)].slice(0, 2).join('') || '🙂', en });
            if (out.length >= AC_CUSTOM_MAX) break;
        }
        return out;
    }

    async function acResolveCustom(a, chaId) {
        const raw = acCustomItems(a.customText).join(', ');
        if (!raw) throw new Error('감정을 하나 이상 적어 주세요. ' + AC_CUSTOM_EX);
        if (a.custom?.raw === raw && a.custom.emos.length) return a.custom.emos.length;
        const res = parseJson(await requestModel(AC_CUSTOM_SYSTEM, raw, true, st.set.acLlm), 'emos');
        const emos = acCleanEmos(res?.emos);
        if (!emos.length) throw new Error('모델이 감정을 태그로 옮기지 못했습니다. 다시 누르거나, 영어로 적어 주세요 (예: smile, crying, happy).');
        a.custom = { raw, emos };
        a.count = 'custom';
        saveAst(chaId);
        return emos.length;
    }
    async function acAddOutfit(a, text) {
        const raw = tidy(text).slice(0, 120), ko = raw.slice(0, 30);
        if (!ko) return;
        const keys = acOutfitKeys(a);
        const hit = acOutfitList(a).find(o => o.ko === ko || o.en.toLowerCase() === raw.toLowerCase());
        if (hit) { if (!keys.includes(hit.key)) a.outfits = [...keys, hit.key]; return; }
        let en;
        try { en = (await acTranslate(raw, 'outfit')).en; } catch (error) {
            console.warn(LOG, 'outfit tr', error);
            throw new Error(`「${ko}」을(를) NAI 태그로 옮기지 못했습니다. 영어 태그로 적어 주세요 (예: maid outfit).`);
        }
        const key = acOutfitKey(en, new Set(acOutfitList(a).map(o => o.key)));
        a.extra.push({ key, ko, en });
        a.outfits = [...keys, key];
    }

    const AC_SP_SYSTEM = `You turn a special scene the user typed (any language) into a NovelAI (Danbooru tag) prompt for one standalone character portrait on a plain white background, for the roleplay bot below.
Reply with one JSON object only, no other text: {"en":"comma-separated Danbooru tags","scene":"short English action name (e.g. aiming rifle)","icon":"one emoji"}
Rules:
- Read the user's words as an action the listed character does in THIS bot's world. Pick the weapons, tools, props and moves that fit the setting (e.g. "battle" in a gun world means holding or firing a gun, in a fantasy world a sword or magic; "work" means the character's job in this story).
- 4 to 8 lowercase English Danbooru tags in ASCII, in the same style and length as the STYLE EXAMPLES: facial expression, pose, hand gesture and held props only. Framing tags such as upper body or pov are allowed; use pov for interaction with the viewer.
- The character's look and outfit are already in the prompt. Never describe hair, eyes, face shape, body or clothes.
- Never name a place, room, building, background or scenery (no stage, hospital, battlefield, classroom, street, indoors, outdoors).
- One character alone: no other people, no multiple views.`;
    async function acCustomSpecial(a, text) {
        const raw = tidy(text).slice(0, 120), ko = raw.slice(0, 20);
        if (!ko || ko === a.special?.ko) return false;
        const hit = acSpecialList(a).find(s => s.ko === ko);
        if (hit) { a.special = { ...hit }; return true; }
        const usedS = new Set(AC_EMO.map(x => x[0]));
        let r;
        try {
            const v = st.view;
            const char = v ? await api.getCharacterFromIndex(v.ci) : null;
            const bot = char && char.chaId === v?.chaId ? (await botContext(char)).text : '';
            const cs = acPicked(a);
            const sps = acSpecialList(a).slice(0, 5).map(x => `- ${x.ko}: ${x.en}`);
            const emos = acEmos(a).filter(m => !m.special).slice(0, 6).map(m => `- ${m.ko}: ${m.en}`);
            const user = [
                bot,
                cs.length ? `# CHARACTERS\n${cs.map(e => `- ${e.name}${e.aliases?.length ? ` (${e.aliases.join(', ')})` : ''}${e.type ? `, ${e.type}` : ''}`).join('\n')}` : '',
                `# STYLE EXAMPLES (other cells of this character; match this tag style)\n${[...sps, ...emos].join('\n')}`,
                `# SPECIAL SCENE TYPED BY USER\n${raw}`,
            ].filter(Boolean).join('\n\n');
            const res = parseJson(await requestModel(AC_SP_SYSTEM, user, true, st.set.acLlm), 'en');
            const en = tidy(isObj(res) ? res.en : '').toLowerCase().slice(0, 200);
            if (!en || !/^[\x20-\x7e]+$/.test(en)) throw new Error('no ascii tags');
            const sc = tidy(res.scene).toLowerCase().slice(0, 40);
            r = { en, scene: /^[\x20-\x7e]+$/.test(sc) ? sc : '', icon: [...tidy(res.icon)].slice(0, 2).join('') };
        } catch (error) {
            console.warn(LOG, 'special tr', error);
            throw new Error(`「${ko}」을(를) NAI 태그로 옮기지 못했습니다. 잠시 뒤 다시 「적용」을 눌러 주세요.`);
        }
        const scene = r.scene || tidy(r.en.split(',')[0]);
        a.special = { ko, icon: r.icon || '✨', en: r.en, scene, key: acKeyFrom(scene, usedS, 's'), custom: true };
        return true;
    }

    function nlChip(asset) {
        const filling = acs.anBusy && acs.anShow, flash = acs.anFlash;
        acs.anFlash = false;
        const q = acs.quota;
        return h('span', { class: 'an-c' + (asset ? ' as' : '') + (filling ? ' ld' : flash ? ' dn' : ''), 'aria-busy': filling ? 'true' : null, style: filling ? `animation-delay:-${Math.min(700, Date.now() - acs.anT0)}ms` : null, title: 'NovelAI 계정의 남은 Anlas와 Opus 무료 생성 할당량 (그리는 동안 30초마다 새로 읽습니다)' },
            'Anlas ', h('b', null, acs.anErr || (acs.an == null ? '…' : acs.an.toLocaleString())),
            !acs.anErr && q ? [h('i', { class: 'an-sep', 'aria-hidden': 'true' }), '할당량 ', h('b', { class: q.neg || q.pct <= 0 ? 'lo' : null }, q.neg ? '다 씀' : `${q.pct}%`)] : null,
            h('button', { class: 'lnk', type: 'button', 'aria-label': 'Anlas · 할당량 다시 읽기', disabled: acs.anBusy, onclick: () => void acAnlas(true) }, '↻'));
    }
    async function acAnlas(force = false) {
        if (acs.anBusy || (!force && acs.anAt && Date.now() - acs.anAt < 30000)) return;
        const key = await naiKey();
        if (!key) return;
        acs.anBusy = true;

        acs.anShow = force;
        if (force) acs.anT0 = Date.now();
        const slow = force ? new Promise(r => setTimeout(r, 700)) : null;
        if (force) render();
        try {
            const res = await api.nativeFetch('https://image.novelai.net/user/data', { method: 'GET', headers: { Authorization: 'Bearer ' + key, Accept: 'application/json' } });
            const buf = new Uint8Array(await res.arrayBuffer());
            await slow;
            if (res.status === 401 || res.status === 403) { acs.an = null; acs.quota = null; acs.anErr = 'NAI 키가 맞지 않습니다'; }
            else if (!res.ok) acs.anErr = `읽지 못함 (${res.status})`;
            else {
                const data = JSON.parse(new TextDecoder().decode(buf));
                const left = data?.subscription?.trainingStepsLeft ?? {};
                acs.an = (Number(left.fixedTrainingStepsLeft) || 0) + (Number(left.purchasedTrainingSteps) || 0);
                const use = data?.subscription?.usage, pct = Number(use?.percent);
                acs.quota = Number.isFinite(pct) && typeof use?.isNegative === 'boolean' ? { pct: Math.max(0, Math.round(pct)), neg: use.isNegative } : null;
                acs.anErr = '';
            }
        } catch (error) {
            console.warn(LOG, 'anlas', error);
            acs.anErr = '읽지 못함';
            await slow;
        }
        acs.anAt = Date.now();
        acs.anBusy = false;
        acs.anFlash = acs.anShow;
        acs.anShow = false;
        render();
    }

    function acGaugeText(run) {
        const left = run.n - run.done;
        const el = Math.max(0, (Date.now() - run.curAt) / 1000);
        const tx = `■ 멈추기 · ${left}장 남음 (남은 ${fmtLeft(Math.max(0, left * acAvg() - el))})`;
        return { tx, el };
    }
    function acStopGauge(run) {
        const { tx, el } = acGaugeText(run);
        const avg = acAvg();
        const style = `animation-duration:${(run.n * avg).toFixed(1)}s;animation-delay:-${(run.done * avg + Math.min(el, avg)).toFixed(1)}s;animation-play-state:${run.stop ? 'paused' : 'running'}`;
        return h('button', { class: 'ix-btn eg big', type: 'button', 'aria-label': tx, disabled: run.stop, onclick: acStop },
            h('span', { class: 'eg-t' }, run.stop ? '멈추는 중…' : tx), h('span', { class: 'eg-f', style }), h('span', { class: 'eg-t eg-w', style }, run.stop ? '멈추는 중…' : tx));
    }
    function acTick() {
        const run = acs.run;
        if (!run) return;
        if (Date.now() - acs.anAt > 30000) void acAnlas();
        const g = ui.root?.isConnected ? ui.root.querySelector('.ix-btn.eg') : null;
        if (!g || run.stop) return;
        const { tx } = acGaugeText(run);
        for (const s of g.querySelectorAll('.eg-t')) s.textContent = tx;
        g.setAttribute('aria-label', tx);
    }

    const gaugeStyle = (at, sec) => `animation-duration:${sec}s;animation-delay:-${Math.max(0, (Date.now() - (at || Date.now())) / 1000).toFixed(2)}s`;
    const loadDots = () => h('span', { class: 'ld', 'aria-hidden': 'true' }, h('i', null, '.'), h('i', null, '.'), h('i', null, '.'));
    function acModeToggle() {

        const nAst = acListNames(acAst()).length;
        const ptOff = !!st.view?.chaId && st.set.ptOff.includes(st.view.chaId);
        const lit = { imagine: !!st.set.auto && setupDone(), asset: nAst > 0 && !ptOff };
        const tip = {
            imagine: lit.imagine ? '자동 그리기 켜짐' : setupDone() ? '자동 그리기 꺼짐' : '준비 전',
            asset: lit.asset ? `에셋 ${nAst}장 있음` : nAst ? `에셋 ${nAst}장 · 채팅에 보이기 꺼짐` : '아직 만든 에셋 없음',
        };

        return h('span', { class: 'md', role: 'tablist', 'aria-label': '모드' }, [['imagine', '삽화'], ['asset', '애드 에셋']].map(([m, label]) => h('button', {
            type: 'button', role: 'tab', class: (!ui.side && ui.mode === m ? 'on ' : '') + 'm-' + m, 'aria-selected': !ui.side && ui.mode === m ? 'true' : 'false',
            title: tip[m], 'aria-label': `${label} · ${tip[m]}`,
            onclick: () => { ui.mode = m; ui.side = ''; ui.menu = ''; acs.menu = ''; renderNow(); if (m === 'asset') void acAnlas(); },
        }, headIcon(m), label, h('i', { class: 'md-led' + (lit[m] ? ' lit' : ''), 'aria-hidden': 'true' }))));
    }

    const acListNames = a => { const have = acHas(); return a ? a.made.filter(n => have.has(n)) : []; };
    const AC_TABS = [
        ['make', () => '준비'],
        ['list', () => { const n = acListNames(acAst()).length; return ['에셋 목록', n ? h('em', { class: 'cnt' }, n) : null]; }],
    ];

    const acOutfitLabel = a => { const os = acOutfits(a); return !os.length ? '고르지 않음' : os.length > 3 ? `${os.length}벌` : os.map(o => o.ko).join(' · '); };
    async function acAskNow(a) {
        const v = st.view;
        const char = v ? await api.getCharacterFromIndex(v.ci) : null;
        if (char?.chaId === v?.chaId) await acAskBot(a, char);
    }

    function renderAsset() {
        const v = st.view;
        const pane = h('section', { class: 'ix-pane' }, intro('애드 에셋', '봇 인물의 복장 · 감정별 그림을 한 번에 그려 봇 에셋에 넣고, 로어북에 적어 봇이 답변에서 꺼내 쓰게 합니다.'));
        if (!v) { noChat(pane); return pane; }
        if (v.group) return add(pane, h('div', { class: 'ix-empty' }, h('b', null, '그룹 채팅에서는 애드 에셋을 쓸 수 없습니다'), '봇 하나의 채팅에서 열어 주세요.'));

        const ptOff = st.set.ptOff.includes(v.chaId);
        const ptRow = () => h('div', { class: 'cf-row sw' },
            h('div', { class: 'cf-tx' }, h('b', null, '채팅에 에셋 그림 보이기'),
                h('p', null, '끄면 이 봇 답변 속 에셋 그림을 화면에서 숨기고, 글로벌노트의 이매진 에셋 칸과 인물마다 로어북 「에셋」 항목을 뺍니다. 그린 에셋 · 로어북 「외형」 · 답변 글은 그대로입니다. 다시 켜면 모두 다시 넣습니다.')),
            toggle(!ptOff, () => {
                const ids = new Set(st.set.ptOff);
                if (ptOff) ids.delete(v.chaId); else ids.add(v.chaId);
                setVal('ptOff', [...ids]);

                const a = acAst();
                if (a) void acEnqueue(() => acSyncOff(a, v.ci, v.chaId)).then(r => {
                    if (!r || (!r.lore && r.note !== 'put' && r.note !== 'cut')) return;
                    const what = [r.lore ? '로어북 「에셋」 항목' : '', r.note === 'put' || r.note === 'cut' ? '글로벌노트의 이매진 에셋 칸' : ''].filter(Boolean).join('과 ');
                    acs.msg = ptOff ? `${what}을 다시 넣었습니다.` : `${what}을 뺐습니다.`;
                    acs.msgOk = true;
                    renderNow();
                }).catch(error => console.warn(LOG, 'off sync', error));
            }));

        const ptTop = ptOff || acListNames(acAst()).length ? h('div', { class: 'cf-card', style: 'margin:0 0 12px' }, ptRow()) : null;
        if (ptTop) add(pane, ptTop);

        const llmDone = !!st.set.setup?.acLlm;
        const llmCur = !llmDone || acs.llmOpen;
        add(pane, h('section', { class: `sp ${llmCur ? 'cur' : 'done'}` },
            h('div', { class: 'sp-hd' },
                h('span', { class: 'sp-n' }, llmCur ? 1 : '✓'),
                h('b', null, 'LLM 모델 고르기'),
                llmCur ? null : h('span', { class: 'sp-sum' }, `${llmName(st.set.acLlm)} 모델`),
                llmCur || acs.run ? null : h('button', { class: 'lnk', type: 'button', onclick: () => { acs.llmOpen = true; acs.reopen = 0; acs.menu = ''; renderNow(); } }, '변경'),
                llmDone && acs.llmOpen ? h('button', { class: 'lnk', type: 'button', onclick: () => { acs.llmOpen = false; renderNow(); } }, '완료') : null),
            h('div', { class: 'sp-bd' }, llmCur ? [
                llmCards('acLlm', () => { acs.llmOpen = false; }),
                h('p', { class: 'ix-hint', style: 'margin:8px 0 0' }, '등장인물 분석 · 감정 태그 · 커스텀 감정을 맡길 모델입니다. 기본은 보조 모델이고, 카드를 누르면 다음 단계로 넘어갑니다. 삽화는 삽화 준비 탭에서 따로 고릅니다.')] : null)));
        if (!llmDone) return add(pane, h('p', { class: 'ix-hint' }, '앞 단계를 마치면 열립니다.'));
        if (!v.hasKey) return add(pane, h('p', { class: 'ix-hint' }, '애드 에셋은 NovelAI 키가 있어야 그릴 수 있습니다.'), keyBox(true));
        const a = acAst();
        if (!a) return add(pane, h('div', { class: 'ix-empty' }, '불러오는 중…'));

        const loreOn = st.busy?.label === '로어북 읽는 중';
        const reread = async () => {
            acs.loreRes = null;
            await rereadLore(st.set.acLlm);
            acs.loreRes = st.err ? ['err', st.err] : st.note ? ['ok', st.note] : null;
            renderNow();
        };
        const loreRow = () => [
            h('div', { class: 'ix-acts', style: 'margin:0 0 10px' },
                h('button', { class: loreOn ? 'ix-btn run' : 'ix-btn', type: 'button', disabled: !!st.busy || !!acs.run, onclick: () => void reread() },
                    loreOn ? [h('span', { class: 'gf', style: gaugeStyle(st.busy.at, 30) }), '등장인물 분석하는 중', loadDots()] : '등장인물 분석')),
            !loreOn && acs.loreRes ? h('div', { class: 'ix-msg ' + acs.loreRes[0], style: 'margin:0 0 10px' }, acs.loreRes[1]) : null,
        ];

        const noCast = !acCast().length;
        const keep = () => saveAst(v.chaId);

        const run = acs.run?.chaId === v.chaId ? acs.run : null;
        const busyElse = !!acs.run && !run;
        const noSp = a.count === 1;

        const hasSp = a.count !== 1 && a.count !== 'custom';
        if (noSp && a.step === 4) a.step = 5;
        const shown = n => (noSp && n > 4 ? n - 1 : n) + 1;
        const cs = acPicked(a), os = acOutfits(a), emos = acEmos(a), sp = acSpecial(a);
        const plan = acPlan(a), have = acHas(), left = plan.filter(t => !have.has(t.name));
        if (run) { a.step = 8; acs.reopen = 0; }

        const ro = !noCast && acs.reopenCha === v.chaId && acs.reopen < a.step && !(acs.reopen === 4 && noSp) ? acs.reopen : 0;
        const goto = n => {
            if (n === 4 && noSp) n = 5;
            a.step = n;
            acs.reopen = 0;
            acs.menu = '';
            acs.trErr = '';
            if (n < 8) acs.msg = '';
            keep();
            renderNow();
        };

        const reopen = n => {
            acs.reopen = n;
            acs.llmOpen = false;
            acs.reopenCha = v.chaId;
            acs.menu = '';
            acs.trErr = '';
            acs.msg = '';
            renderNow();
        };

        const okAt = n => n === 1 ? cs.length > 0 : n === 2 ? os.length > 0 : n === 3 && a.count === 'custom' ? !acs.cu : true;

        const next = n => {
            if (n === 1 && !a.asked) void acAskNow(a);

            if (n === 3 && a.count === 'custom' && !acCustomItems(a.customText).length) { acs.cuErr = ''; acs.cuNeed = true; renderNow(); cFocus(); return; }
            if (n === 3) acs.cuNeed = false;
            if (n === 3 && a.count === 'custom' && !(a.custom?.raw === acCustomItems(a.customText).join(', ') && a.custom.emos.length)) {
                if (acs.cu) return;
                acs.cu = true;
                acs.cuAt = Date.now();
                acs.cuErr = '';
                renderNow();
                void acResolveCustom(a, v.chaId).then(() => { acs.cu = false; next(3); }, error => {
                    console.warn(LOG, 'custom emos', error);
                    acs.cu = false;
                    acs.cuErr = String(error?.message ?? error);
                    renderNow();
                });
                return;
            }

            if (n === 7 || (n === ro && a.step > 7)) {
                void acEnqueue(() => acSyncNote(a, v.ci, v.chaId)).then(r => {
                    if (r === 'put') { acs.msg = '글로벌노트의 이매진 에셋 칸을 지금 글로 바꿨습니다.'; acs.msgOk = true; renderNow(); }
                }).catch(error => console.warn(LOG, 'note', error));
            }
            if (n === ro) { acs.reopen = 0; acs.menu = ''; acs.trErr = ''; keep(); renderNow(); return; }
            goto(n === 3 && noSp ? 5 : n + 1);
        };

        let bodyN = 0;

        const nextBtn = (disabled, label = '다음') => {
            const n = bodyN;
            if (n === ro && !disabled && label === '다음') return null;
            return h('div', { class: 'ix-acts' }, h('button', { class: 'ix-btn main', type: 'button', disabled, onclick: () => next(n) }, label));
        };
        const hint = (...kids) => h('p', { class: 'ix-hint', style: 'margin:0 0 10px' }, ...kids);
        const step = (n, title, sum, body) => {
            if (n === 4 && noSp) return null;
            const at = noCast ? 1 : a.step;
            const s = n === ro ? 'cur' : n < at ? 'done' : n === at ? 'cur' : 'lock';
            let bd = null;
            if (s === 'cur') { bodyN = n; bd = body(); bodyN = 0; }

            const look = n === 8 && fin && s === 'cur' ? 'done' : s;
            return h('section', { class: `sp ${look}${n === 8 ? ' end' : ''}` },
                h('div', { class: 'sp-hd' },
                    h('span', { class: 'sp-n' }, look === 'done' ? '✓' : shown(n)),
                    h('b', null, title),
                    look !== 'cur' && sum && !noCast ? h('span', { class: 'sp-sum' }, sum) : null,
                    s === 'done' && !run ? h('button', { class: 'lnk', type: 'button', onclick: () => reopen(n) }, '변경') : null,
                    n === ro && okAt(n) ? h('button', { class: 'lnk', type: 'button', onclick: () => next(n) }, '완료') : null),
                h('div', { class: 'sp-bd' }, bd));
        };
        if (!cs.some(e => e.id === acs.who)) acs.who = cs[0]?.id ?? '';
        if (!os.some(o => o.key === acs.outfit)) acs.outfit = os[0]?.key ?? '';

        const viewChips = gauge => {
            if (cs.length < 2 && !gauge) return null;
            return h('div', { class: 'vw' + (gauge ? ' gg' : ''), role: 'tablist', 'aria-label': '보는 인물' }, cs.map(e => {
                const n = acPlan(a, e.id).length, d = acDoneOf(a, e);
                const isCur = run?.cur?.e.id === e.id;
                const tag = n && d >= n ? `✓ ${n}/${n}` : isCur ? `그리는 중 ${d}/${n}` : run?.tasks.some(t => t.e.id === e.id) ? '차례 기다림' : `${d}/${n}`;
                const cls = [acs.who === e.id ? 'sel' : '', gauge && isCur ? 'cur' : '', gauge && n && d >= n ? 'done' : ''].filter(Boolean).join(' ');
                return h('button', {
                    type: 'button', role: 'tab', class: cls, 'aria-selected': acs.who === e.id ? 'true' : 'false', disabled: !!run,
                    onclick: () => { acs.who = e.id; acs.menu = ''; renderNow(); },
                },
                gauge ? h('i', { class: 'gg-f', style: `width:${n ? Math.round(d / n * 100) : 0}%` }) : null,
                h('span', { class: 'cc-av', style: `background:${acHue(e)} !important` }, acInitial(e.name)),
                h('b', null, e.name), h('small', null, tag));
            }));
        };

        const sPick = () => [
            hint('로어북에서 읽은 인물입니다. 체크한 인물을 애드 에셋 한 번에 차례로 모두 그립니다.'),
            ...loreRow(),
            h('div', { class: 'who' }, acCast().map(e => {
                const on = cs.includes(e);
                const n = acPlan({ ...a, picked: [e.id] }).length, d = acPlan({ ...a, picked: [e.id] }).filter(t => have.has(t.name)).length;
                return h('button', {
                    type: 'button', role: 'checkbox', class: 'pk' + (on ? ' sel' : ''), 'aria-checked': on ? 'true' : 'false',
                    onclick: () => { const ids = acPickedIds(a); a.picked = on ? ids.filter(x => x !== e.id) : [...ids, e.id]; keep(); renderNow(); },
                }, h('i', { class: 'pk-b' }, '✓'),
                h('span', null, h('b', { class: 'pk-nm', style: `background:${acHue(e)} !important` }, e.persona || e.src === 'persona' ? `${e.name} (User)` : e.name),
                    h('small', { class: n && d >= n ? 'full' : '' }, n && d >= n ? `✓ ${n}장 있음` : d ? `${d}/${n}장` : '에셋 없음')));
            })),
            nextBtn(!cs.length, cs.length ? '다음' : '인물을 하나 이상 고르세요'),
        ];

        const sNoCast = () => [
            hint(h('b', null, '등장인물이 없습니다. '), '로어북 · 페르소나에서 인물을 읽어 옵니다.'),
            ...loreRow(),
            nextBtn(true, '등장인물을 먼저 분석하세요'),
        ];

        const sOutfit = () => {
            const list = acOutfitList(a), keys = acOutfitKeys(a), allOn = list.every(o => keys.includes(o.key));
            let input;
            const addOne = async () => {
                const text = input.value;
                if (!tidy(text) || acs.tr) return;
                acs.tr = true;
                acs.trAt = Date.now();
                acs.trErr = '';
                renderNow();
                try { await acAddOutfit(a, text); } catch (error) { acs.trErr = String(error?.message ?? error); } finally { acs.tr = false; }
                keep();
                renderNow();
            };
            return [
                hint(`고른 인물 ${cs.length}명(${cs.map(e => e.name).join(' · ')})을 고른 복장으로 그립니다. `,
                    h('button', { class: 'lnk', type: 'button', onclick: () => { a.outfits = allOn ? [] : list.map(o => o.key); keep(); renderNow(); } }, allOn ? '전체 해제' : '전체 선택')),
                acs.asking ? h('button', { class: 'ix-btn run', type: 'button', disabled: true, style: 'width:100%;margin:10px 0 6px' },
                    h('span', { class: 'gf', style: gaugeStyle(acs.askAt, 30) }), '봇 설명에서 복장 · 특수 장면을 찾는 중', loadDots())
                    : acs.askErr ? h('p', { class: 'of-hd' }, `봇에서 복장을 찾지 못했습니다: ${acs.askErr} `, h('button', { class: 'lnk', type: 'button', onclick: () => void acAskNow(a) }, '다시 찾기'))
                    : a.why ? h('p', { class: 'of-hd' }, a.why) : null,
                h('div', { class: 'who ofs' }, list.map(o => {
                    const on = keys.includes(o.key);
                    return h('button', {
                        type: 'button', class: 'pk' + (on ? ' sel' : ''), 'aria-pressed': on ? 'true' : 'false', title: o.en,
                        onclick: () => { a.outfits = on ? keys.filter(k => k !== o.key) : [...keys, o.key]; keep(); renderNow(); },
                    }, h('i', { class: 'pk-b' }, '✓'), h('span', null, h('b', null, o.ko), h('small', null, o.src)));
                })),
                input = h('input', {
                    class: 'cf-in of-in', type: 'text', placeholder: acs.tr ? '태그로 옮기는 중…' : '＋ 복장 추가', 'aria-label': '복장 직접 추가', disabled: acs.tr,
                    onkeydown: ev => { if (ev.key === 'Enter' && !ev.isComposing) void addOne(); },
                    onchange: () => void addOne(),
                }),
                acs.tr ? h('button', { class: 'ix-btn sm run', type: 'button', disabled: true, style: 'width:100%;margin-top:8px' },
                    h('span', { class: 'gf', style: gaugeStyle(acs.trAt, 10) }), '복장을 NAI 태그로 옮기는 중', loadDots()) : null,
                acs.trErr ? h('p', { class: 'ix-msg err' }, acs.trErr) : null,
                nextBtn(!os.length),
            ];
        };

        const sCount = () => [
            h('div', { class: 'acnt', role: 'radiogroup', 'aria-label': '에셋 개수' }, [1, 10, 50].map(k => {
                const [title, desc] = AC_COUNT_INFO[k];
                const sel = a.count === k;
                return h('button', {
                    type: 'button', role: 'radio', class: 'cn' + (sel ? ' sel' : ''), 'aria-checked': sel ? 'true' : 'false',
                    onclick: () => { a.count = k; keep(); renderNow(); },
                }, h('span', { class: 'cn-top' }, h('span', { class: 'cn-num' }, String(k), h('small', null, '개')), h('i', { class: 'cn-chk' }, '✓')),
                h('b', { class: 'cn-t' }, title), h('span', { class: 'cn-d' }, desc),
                h('span', { class: 'cn-sum' }, `인물 ${cs.length}명 × 복장 ${os.length}벌 × 에셋 ${k}개 = `, h('b', null, `${cs.length * os.length * k}장`)));
            }), cCard()),
            acs.cu ? h('button', { class: 'ix-btn run', type: 'button', disabled: true, style: 'width:100%;margin-top:10px' },
                h('span', { class: 'gf', style: gaugeStyle(acs.cuAt, 10) }), '감정을 태그로 옮기는 중', loadDots()) : null,
            acs.cuErr ? h('p', { class: 'ix-msg err' }, `감정을 태그로 옮기지 못했습니다: ${acs.cuErr}`)
                : acs.cuNeed && a.count === 'custom' ? h('p', { class: 'ix-msg err' }, '커스텀 칸에 감정을 하나 이상 적으세요. 쉼표로 나눕니다.') : null,

            acs.cu ? null : nextBtn(false, ro === 3 && a.count === 'custom' ? '완료' : '다음'),
        ];

        const cFocus = () => {
            const el = ui.root?.querySelector('.cn.cu .cn-in');
            if (!el || el.disabled) return;
            el.focus();
            try { el.setSelectionRange(el.value.length, el.value.length); } catch {}
        };
        const cCard = () => {
            const sel = a.count === 'custom';
            const cnt = () => acCustomItems(a.customText).length;
            const [title, desc] = AC_COUNT_INFO.custom;
            const numEl = h('span', null, String(cnt()));
            const totEl = h('b', null, `${cs.length * os.length * cnt()}장`);
            const kEl = h('span', null, String(cnt()));
            const card = h('div', {
                role: 'radio', tabindex: '0', class: 'cn cu' + (sel ? ' sel' : ''), 'aria-checked': sel ? 'true' : 'false',
                onclick: ev => {
                    if (ev.target.closest('.cn-in')) return;
                    if (!sel) { a.count = 'custom'; acs.cuErr = ''; keep(); renderNow(); }
                    cFocus();
                },
                onkeydown: ev => { if (ev.target === card && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); card.click(); } },
            }, h('span', { class: 'cn-top' }, h('span', { class: 'cn-num' }, numEl, h('small', null, '개')), h('i', { class: 'cn-chk' }, '✓')),
            h('b', { class: 'cn-t' }, title), h('span', { class: 'cn-d' }, desc),

            h('textarea', {
                class: 'cn-in', placeholder: AC_CUSTOM_EX, value: a.customText ?? '', maxlength: '1000', rows: '2', 'aria-label': '커스텀 감정 (쉼표나 줄 바꿈으로 나눔)', disabled: acs.cu,
                style: acs.cuH ? `height:${acs.cuH}` : null,
                oninput: ev => {
                    a.customText = ev.target.value;
                    acs.cuErr = '';
                    if (a.count !== 'custom') a.count = 'custom';
                    const k = cnt();
                    numEl.textContent = kEl.textContent = String(k);
                    totEl.textContent = `${cs.length * os.length * k}장`;
                    clearTimeout(cCard.t);
                    cCard.t = setTimeout(keep, 400);
                },
                onkeydown: ev => { if (ev.key === 'Enter' && !ev.shiftKey && !ev.isComposing) { ev.preventDefault(); clearTimeout(cCard.t); keep(); if (okAt(3)) next(3); } },

                onfocus: () => { if (a.count !== 'custom') { a.count = 'custom'; acs.cuErr = ''; keep(); renderNow(); cFocus(); } },
                onblur: () => { clearTimeout(cCard.t); keep(); },
            }),
            h('span', { class: 'cn-sum' }, `인물 ${cs.length}명 × 복장 ${os.length}벌 × 에셋 `, kEl, '개 = ', totEl));

            const ta = card.querySelector('.cn-in');
            try { new (ta.ownerDocument.defaultView?.ResizeObserver ?? ResizeObserver)(() => { if (ta.style.height) acs.cuH = ta.style.height; }).observe(ta); } catch {}
            return card;
        };

        const spRow = () => {
            let input;
            const apply = async () => {
                const text = input.value;
                if (!tidy(text) || acs.sp) return;
                acs.sp = true;
                acs.spAt = Date.now();
                acs.spErr = '';
                renderNow();
                try { if (await acCustomSpecial(a, text)) acs.edit = null; } catch (error) { acs.spErr = String(error?.message ?? error); } finally { acs.sp = false; }
                keep();
                renderNow();
            };
            const auto = () => { a.special = null; acs.spErr = ''; keep(); renderNow(); };
            return [
                h('div', { style: 'display:flex;gap:6px;align-items:center;margin:10px 0 0' },
                    input = h('input', {
                        class: 'cf-in', type: 'text', style: 'flex:1;min-width:0', maxlength: '120', disabled: acs.sp,
                        placeholder: acs.sp ? '태그로 옮기는 중…' : '특수 에셋 직접 적기 (예: 슬픔, 요리, 기타 연주)', 'aria-label': '특수 에셋 직접 적기',
                        onkeydown: ev => { if (ev.key === 'Enter' && !ev.isComposing) void apply(); },
                    }),
                    h('button', { class: 'ix-btn sm', type: 'button', disabled: acs.sp, onclick: () => void apply() }, '적용'),
                    a.special?.custom ? h('button', { class: 'ix-btn sm', type: 'button', disabled: acs.sp, title: '봇에 맞춰 고른 후보로 되돌립니다', onclick: auto }, '자동으로') : null),
                acs.sp ? h('button', { class: 'ix-btn sm run', type: 'button', disabled: true, style: 'width:100%;margin-top:8px' },
                    h('span', { class: 'gf', style: gaugeStyle(acs.spAt, 10) }), '특수 에셋을 NAI 태그로 옮기는 중', loadDots()) : null,
                acs.spErr ? h('p', { class: 'ix-msg err' }, acs.spErr) : null,
            ];
        };

        const sSpecial = () => {
            const e = cs.find(x => x.id === acs.who) ?? cs[0];
            const sl = acSlugs(a);
            return [
                h('div', { class: 'ad-set' },
                    viewChips(false),
                    hint(hasSp ? `한 장마다 「고정 외형 + 아래 감정 · 자세」로 그립니다. ${a.count === 10 ? '열째' : '맨 끝'} 칸은 ${a.special?.custom ? '직접 적은' : '봇에 맞춰 자동으로 고른'} 특수 장면(${sp.icon} ${sp.ko})입니다. 아래 칸에 적어 바꿀 수 있고, 프롬프트는 「변경」으로 고칩니다.`
                        : '한 장마다 「고정 외형 + 아래 감정 · 자세」로 그립니다. 적은 감정을 모델이 옮긴 태그이고, 특수 에셋은 없습니다. 프롬프트는 「변경」으로 고칩니다.'),
                    hasSp ? spRow() : null,
                    !hasSp ? null : acs.asking ? h('p', { class: 'ix-hint' }, '봇에 맞는 특수 장면을 찾는 중', loadDots())
                        : acs.askErr ? h('p', { class: 'ix-hint' }, '봇에 맞는 특수 장면 후보를 받지 못해 기본 후보를 씁니다. ', h('button', { class: 'lnk', type: 'button', onclick: () => void acAskNow(a) }, '다시 찾기')) : null,
                    e ? h('div', { class: 'er' }, emos.map((emo, i) => {
                        const name = acName(sl[e.id], os[0]?.key ?? 'base', emo.key);
                        const p = acPrompt(a, e, emo);
                        return h('div', { class: 'er-r' + (emo.special ? ' sp-r' : '') },
                            h('span', { class: 'er-i' }, emo.icon),
                            h('span', { class: 'er-n' }, h('b', null, `${i + 1}. ${emo.ko}`,
                                i === 0 && a.ref ? h('span', { class: 'bdg-in' }, '레퍼런스') : null,
                                emo.special ? h('span', { class: 'bdg-in bdg-sp' }, '특수') : null), h('code', null, name)),
                            h('span', { class: 'er-p', title: p }, p),
                            h('button', { class: 'ix-btn sm', type: 'button', onclick: () => { acs.edit = { cid: e.id, okey: os[0]?.key ?? 'base', ekey: emo.key }; renderNow(); } }, '변경'));
                    })) : null),
                nextBtn(false),
            ];
        };

        const sArtist = () => [
            presetGrid(null, null, true),
            h('p', { class: 'ix-hint', style: 'margin:8px 0 0' }, `작가 탭과 같은 목록입니다. 여기서 고른 작가는 애드 에셋에만 쓰고, 삽화 작가(지금 ${preset().name || '이름 없음'})와 따로 저장합니다. 작가를 고치거나 새로 만들려면 `,
                h('button', { class: 'lnk', type: 'button', onclick: () => { ui.side = 'style'; renderNow(); } }, '작가 탭'), '에서 합니다.'),
            h('details', { class: 'ad-set', style: 'margin-top:14px', open: acs.adv, ontoggle: ev => { acs.adv = ev.currentTarget.open; } },
                h('summary', null, '고급 설정 ', h('small', null, `시점 태그 · ${tidy(a.view.split(',')[0]) || '시점 없음'}`)),
                h('div', { class: 'cf-row vw', style: 'margin-top:8px' },
                    h('div', { class: 'cf-tx' }, h('b', null, '시점 태그'), h('p', null, '감정 그림마다 붙는 구도 태그입니다. 특수 에셋에는 붙지 않습니다.')),
                    h('input', {
                        class: 'cf-in', value: a.view, spellcheck: 'false', 'aria-label': '시점 태그', placeholder: AC_VIEW_DEF,
                        onchange: ev => { a.view = tidy(ev.target.value); keep(); renderNow(); },
                    })),
                h('p', { class: 'ix-hint', style: 'margin:6px 0 0' }, `기본: ${AC_VIEW_DEF}. 전신은 full body, 상반신은 upper body 로 바꿉니다. 이미 그린 그림은 다시 그려야 바뀝니다.`,
                    a.view !== AC_VIEW_DEF ? [' ', h('button', { class: 'lnk', type: 'button', onclick: () => { a.view = AC_VIEW_DEF; keep(); renderNow(); } }, '기본으로 되돌리기')] : null)),
            nextBtn(false),
        ];

        const sModel = () => [
            modelPick(st.set.model, m => { st.set = { ...st.set, model: m }; saveSet(); renderNow(); }),
            h('p', { class: 'ix-hint', style: 'margin:6px 0 12px' }, '설정 탭의 NAI 모델과 같은 값입니다. 여기서 바꾸면 삽화를 그릴 때도 이 모델을 씁니다.'),
            h('div', { class: 'cf-row sw rf' },
                h('div', { class: 'cf-tx' }, h('b', null, '레퍼런스'), h('p', null, '기본 그림을 먼저 그린 뒤, 나머지 그림에 레퍼런스로 넣어 얼굴 · 옷이 같게 나오게 합니다.')),
                toggle(a.ref, () => { a.ref = !a.ref; keep(); renderNow(); })),
            h('p', { class: 'ix-hint', style: 'margin:8px 0 0' }, a.ref
                ? '기본 그림을 레퍼런스로 나머지 그림에 넣습니다. 고른 모델이 레퍼런스를 받지 않으면 NAI 오류가 그림 칸에 뜹니다. 그때는 모델을 바꾸거나 레퍼런스를 끄고 다시 그리세요.'
                : '레퍼런스를 꺼 두어 한 장씩 따로 그립니다. 얼굴이 조금씩 달라질 수 있습니다.'),
            h('p', { class: 'ix-hint', style: 'margin:4px 0 0' }, '레퍼런스를 넣으면 한 장에 Anlas 가 더 듭니다. Opus 무료 범위를 넘을 수 있습니다.'),
            nextBtn(false),
        ];

        const sNote = () => {
            const ta = h('textarea', {
                class: 'cf-ta gn-ta', rows: 9, spellcheck: 'false', 'aria-label': '글로벌노트에 붙일 글', value: acNoteNow(a),
                onchange: () => { a.gn = ta.value; a.gnEdited = true; keep(); renderNow(); },
            });
            return [
                hint('봇이 감정 그림을 띄우는 법을 글로벌노트 끝에 붙입니다. 고른 인물 · 복장 · 감정 · 특수 에셋으로 자동으로 썼고, 바로 고칠 수 있습니다.'),

                ptOff ? h('div', { class: 'ix-msg', style: 'margin:0 0 10px' }, h('b', null, '꺼 둠. '), '「채팅에 에셋 그림 보이기」를 꺼 두어 지금은 이 글을 글로벌노트에 넣지 않습니다. 토글을 다시 켜면 넣습니다.') : null,
                h('p', { class: 'ix-hint', style: 'margin:0 0 10px;color:var(--bad)' }, h('b', null, ro === 7 ? '잘 모른다면 고치지 말고 「완료」를 누르세요.' : '잘 모른다면 고치지 말고 「다음」으로 넘기세요.')),
                ta,
                h('p', { class: 'ix-hint', style: 'margin:8px 0 0' },
                    a.gnEdited ? ['직접 고친 글입니다. 인물 · 복장 · 감정 개수 · 특수 에셋을 바꿔도 이 글은 그대로입니다. ',
                        h('button', { class: 'lnk', type: 'button', onclick: () => { a.gn = ''; a.gnEdited = false; keep(); renderNow(); } }, '자동 글로 되돌리기')]
                        : '인물 · 복장 · 감정 개수 · 특수 에셋을 바꾸면 이 글도 따라 바뀝니다. 글은 봇이 읽기 쉽게 영어로 씁니다.',
                    h('br'), '봇의 글로벌노트에는 ', h('code', null, AC_NOTE_OPEN), '과 ', h('code', null, AC_NOTE_CLOSE),
                    ' 사이에만 쓰고, 그 밖의 글은 건드리지 않습니다. 고른 에셋을 모두 그린 뒤에 넣고, 하나라도 지우면 뺍니다.'),
                nextBtn(false),
            ];
        };

        const isRefT = t => a.ref && acRefName(a, t.e, t.slug, t.o) === t.name;
        const refPlan = plan.filter(isRefT), refLeft = left.filter(isRefT);
        const refCheck = !run && a.ref && refPlan.length > 0 && !refLeft.length && left.length > 0;

        const fin = !run && !noCast && plan.length > 0 && !left.length;
        if (fin && a.step >= 8) ptTop?.remove();
        const stopGauge = () => acStopGauge(run);
        const addBtn = () => {
            if (run) return stopGauge();
            if (busyElse) return h('button', { class: 'ix-btn main big', type: 'button', disabled: true }, '▶ 애드 에셋 · 다른 봇을 그리는 중입니다');

            if (acs.cu) return h('button', { class: 'ix-btn main big', type: 'button', disabled: true }, '▶ 애드 에셋 · 감정을 태그로 옮기는 중입니다');
            if (!cs.length) return h('button', { class: 'ix-btn main big', type: 'button', disabled: true }, '▶ 애드 에셋 · 인물을 고르세요');
            if (!left.length) return armButton(`↻ 애드 에셋 다시 · 인물 ${cs.length}명 · ${plan.length}장`, `한 번 더 누르면 ${plan.length}장을 모두 새로 그립니다`, () => acStart(a, plan), 'ix-btn main big');

            if (refCheck) return h('button', { class: 'ix-btn main big', type: 'button', onclick: () => acStart(a, left) }, `✔ 레퍼런스 확인 · 나머지 ${left.length}장 그리기`);
            if (refLeft.length && refLeft.length < left.length) return h('button', { class: 'ix-btn main big', type: 'button', onclick: () => acStart(a, left) }, `▶ 애드 에셋 · 레퍼런스 ${refLeft.length}장 먼저 그리기`);
            return h('button', { class: 'ix-btn main big', type: 'button', onclick: () => acStart(a, left) }, `▶ 애드 에셋 · 인물 ${cs.length}명 · ${left.length < plan.length ? '남은 ' : ''}${left.length}장`);
        };
        const tile = (t, lab, rc) => {
            const path = have.get(t.name), fail = acs.fail.get(t.name);
            const cur = run?.cur?.name === t.name && !run.stop;
            const isRef = a.ref && acRefName(a, t.e, t.slug, t.o) === t.name;
            const open = acs.menu === t.name && !acs.run;
            const item = (label, small, fn, cls) => h('button', { type: 'button', class: cls, onclick: () => { acs.menu = ''; fn(); } }, h('b', null, label), h('small', null, small));
            const menu = open ? h('div', { class: 'menu as-menu', role: 'menu' },
                path ? item('크게 보기', '그림을 크게 엽니다', () => { renderNow(); void showBig(path); }) : null,
                item('다시 그리기', isRef ? '이 한 장만 새로 그립니다' : '같은 레퍼런스로 이 한 장만', () => acStart(a, [t], true)),
                isRef ? item('다시 그리고 나머지도 새로', '새 기본을 레퍼런스로 넣어 모두 다시', () => {
                    const rest = plan.filter(x => x.e.id === t.e.id && x.o.key === t.o.key && x.name !== t.name);
                    acStart(a, [t, ...rest]);
                }) : path ? item('이 그림을 레퍼런스로', '기본 대신 이 그림을 넣습니다', () => {
                    a.refName[`${t.e.id}|${t.o.key}`] = t.name;
                    keep();
                    acs.msg = `「${t.emo.ko}」을(를) 레퍼런스로 삼았습니다. 다음에 그리는 칸부터 이 그림을 넣습니다.`;
                    acs.msgOk = true;
                    renderNow();
                }) : null,
                item('프롬프트 변경', '감정 · 자세 태그만 바꿉니다', () => { acs.edit = { cid: t.e.id, okey: t.o.key, ekey: t.emo.key }; renderNow(); }),
                path ? item('지우기', `봇 에셋에서 ${t.name}을(를) 뺍니다`, () => {
                    void acEnqueue(() => acDelete(a, t.name, t.e, t.slug, v.ci, v.chaId)).then(r => {
                        acs.msg = `${t.name}을(를) 봇 에셋에서 뺐습니다.` + (r.note === 'cut' ? ' 글로벌노트의 이매진 에셋 칸도 뺐습니다.' : '');
                        acs.msgOk = true;
                        renderNow();
                    })
                        .catch(error => { acs.msg = `지우지 못했습니다: ${error?.message ?? error}`; acs.msgOk = false; renderNow(); });
                }, 'del') : null) : null;
            return h('div', { class: 'as-t' + (rc ? ' rc-t' : '') + (open ? ' on' : '') + (fail && !path ? ' bad' : '') },
                h('button', {
                    class: 'as-b', type: 'button', 'aria-label': `${t.emo.ko} 메뉴`, disabled: !!acs.run,
                    onclick: () => { acs.menu = open ? '' : t.name; renderNow(); },
                },
                h('div', { class: 'as-im' + (cur ? ' cur' : path ? ' ok' : fail ? ' bad' : ' wait') },
                    path && !cur ? h('img', { 'data-path': path, alt: t.name })
                        : cur ? [h('i'), h('em', null, t.emo.key === 'default' ? '기본 그리는 중' : isRef ? '레퍼런스 그리는 중' : '그리는 중'), h('b', { class: 'sh' })]
                        : fail ? h('em', { title: fail }, fail) : h('em', null, '아직 없음')),
                isRef ? h('span', { class: 'bdg', title: '나머지 그림에 레퍼런스로 넣습니다' }, '레퍼런스') : null,
                t.emo.special ? h('span', { class: 'bdg bdg-sp' }, '특수') : null,
                h('span', { class: 'as-cap' }, h('b', null, lab || `${t.emo.icon} ${t.emo.ko}`, a.prompts[t.name] ? AC_ED_BDG() : null), h('code', null, t.name))),
                rc ? h('div', { class: 'rc-tb' },
                    h('button', { type: 'button', disabled: !!acs.run, onclick: () => acStart(a, [t], true) }, '↻ 다시 그리기'),
                    h('button', { type: 'button', 'aria-label': `${t.emo.ko} 메뉴`, disabled: !!acs.run, onclick: () => { acs.menu = open ? '' : t.name; renderNow(); } }, '⋯')) : null,
                menu);
        };
        const sRun = () => {
            const e = cs.find(x => x.id === acs.who) ?? cs[0];
            const tasks = e ? plan.filter(t => t.e.id === e.id && t.o.key === acs.outfit) : [];
            const drawnAll = [...acMineAll(a)].filter(n => have.has(n)).length;
            const showing = !!run || !!acs.msg || plan.some(t => have.has(t.name));
            const avgLeft = fmtLeft(left.length * acAvg());
            const refView = refCheck || !!run?.refOnly;
            const msgBox = style => acs.msg ? h('div', { class: 'ix-msg' + (acs.msgOk ? ' ok ok-box' : ' err'), style }, acs.msg) : null;
            const ofSeg = () => os.length > 1 ? h('div', { style: 'margin-top:10px' }, seg(os.map(o => [o.key, o.ko]), acs.outfit, k => { acs.outfit = k; acs.menu = ''; renderNow(); })) : null;
            const rzBlock = () => drawnAll && !run ? h('div', { class: 'rz' },
                h('div', { class: 'rz-tx' }, h('b', null, '생성한 에셋 전체 지우기'), h('span', null, `이매진이 그린 `, h('code', null, 'c_*'), ` 그림 ${drawnAll}장(모든 인물)과 인물마다 로어북 두 항목을 지웁니다.`)),
                armButton('전체 지우기', '한 번 더 누르면 전부 지웁니다', () => {
                    void acEnqueue(() => acClearAll(a, v.ci, v.chaId)).then(r => {
                        acs.msg = `생성한 에셋 ${r.n}장과 로어북 항목 ${r.lore}개를 지웠습니다.` + (r.note ? ' 글로벌노트의 이매진 에셋 칸도 뺐습니다.' : '');
                        acs.msgOk = true;
                        renderNow();
                    }).catch(error => { acs.msg = `지우지 못했습니다: ${error?.message ?? error}`; acs.msgOk = false; renderNow(); });
                })) : null;

            if (fin) {
                const el = Date.now() - acs.finAt, fresh = el < 1200;
                const ok = h('span', { class: 'fn-ok' + (fresh ? '' : ' still'), 'aria-hidden': 'true' });
                ok.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
                const li = (tx, small) => h('li', null, h('span', null, tx, small ? h('small', null, small) : null));
                const per = cs.map(x => `${x.name} ${plan.filter(t => t.e.id === x.id).length}`).join(' · ');
                return [h('div', { class: 'fn-card' + (fresh ? ' fn-rise' : ''), style: fresh ? `--fe:${el}ms` : null },
                    h('div', { class: 'fn-top' }, ok,
                        h('div', { class: 'fn-tt' }, h('b', null, '준비가 끝났습니다.'), h('span', null, '채팅을 진행하면 자동으로 이미지가 출력됩니다.'))),
                    h('ul', { class: 'fn-ck' },
                        li(`봇 에셋에 그림 ${plan.length}장을 넣었습니다`, cs.length > 1 ? per : ''),
                        ptOff ? li('인물마다 로어북 「외형」을 썼습니다', '「에셋」 항목은 꺼 둠') : li('인물마다 로어북 「외형」 · 「에셋」을 썼습니다', `${cs.length * 2}항목`),
                        ptOff ? h('li', { class: 'off' }, h('span', null, '글로벌노트의 이매진 에셋 칸은 꺼 둠', h('small', null, '아래 토글을 켜면 다시 넣습니다')))
                            : li('글로벌노트에 에셋 목록을 넣었습니다')),
                    acs.msg ? h('div', { class: 'fn-msg' }, msgBox('margin:0')) : null,
                    ptRow(),
                    h('div', { class: 'fn-go' },
                        h('button', { class: 'ix-btn main', type: 'button', onclick: () => closePanel() }, '채팅으로 돌아가기'),
                        h('button', { class: 'ix-btn', type: 'button', onclick: () => { ui.atab = 'list'; acs.menu = ''; renderNow(); } }, `에셋 목록 보기 · ${acListNames(a).length}장`)),

                    h('details', { class: 'fn-fold', open: acs.fOpen, ontoggle: ev => { acs.fOpen = ev.currentTarget.open; } },
                        h('summary', null, '그린 그림 고치기', h('small', null, '한 장씩 다시 그리기 · 프롬프트 변경')),
                        h('div', null, viewChips(false), ofSeg(), h('div', { class: 'as-g', style: 'margin-top:10px' }, tasks.map(t => tile(t))))),
                    h('details', { class: 'fn-fold', open: acs.mOpen, ontoggle: ev => { acs.mOpen = ev.currentTarget.open; } },
                        h('summary', null, '관리', h('small', null, '모두 다시 그리기 · 전체 지우기')),
                        h('div', null,
                            h('div', { class: 'ix-acts', style: 'margin-top:0' }, busyElse || acs.cu ? addBtn()
                                : armButton(`↻ 애드 에셋 다시 · 인물 ${cs.length}명 · ${plan.length}장`, `한 번 더 누르면 ${plan.length}장을 모두 새로 그립니다`, () => acStart(a, plan), 'ix-btn')),
                            rzBlock())))];
            }

            const refRedo = !!run?.single && run.tasks.every(isRefT) && a.ref && refPlan.length > 0 && left.some(t => !isRefT(t));
            if (refCheck || refRedo) {
                const restN = plan.length - refPlan.length, restDone = restN - left.filter(t => !isRefT(t)).length;
                return [
                    refRedo ? h('div', { class: 'ix-acts', style: 'margin:0 0 12px' }, stopGauge()) : null,
                    h('div', null,
                        h('div', { class: 'rc-pg' }, h('i', { class: 'dn' }), h('i')),
                        h('div', { class: 'rc-pn' }, h('span', { class: 'dn' }, `① 레퍼런스 ${refPlan.length}/${refPlan.length} ✓`), h('span', { class: 'nx' }, `② 나머지 ${restDone}/${restN} · 확인하면 시작`))),
                    h('h3', { class: 'rc-h' }, `레퍼런스 ${refPlan.length}장을 그렸습니다`),
                    h('ul', { class: 'rc-ul' },
                        h('li', null, `나머지 ${restN - restDone}장은 이 레퍼런스를 넣어 얼굴과 복장을 맞춰 그립니다.`),
                        h('li', null, '마음에 들지 않는 그림은 「↻ 다시 그리기」를 누르세요. 몇 번이든 다시 그릴 수 있습니다.')),
                    msgBox('margin:0 0 12px'),
                    h('div', { class: 'as-g rc-g' }, refPlan.map(t => tile(t, `${t.e.name} · ${t.o.ko}`, true))),
                    rzBlock(),
                ];
            }

            return [
                h('div', { class: 'ix-acts', style: 'margin-top:0' }, addBtn(),
                    h('span', { class: 'ix-hint' }, `${acPreset().name || '작가'} · ${modelName(st.set.model)} · 레퍼런스 ${a.ref ? '켬' : '끔'}${hasSp ? ` · 특수 ${sp.icon} ${sp.ko}` : ''} · 남은 ${left.length}장 약 ${avgLeft}`)),
                showing ? viewChips(true) : null,
                msgBox(),

                refView ? h('p', { class: 'ix-hint', style: 'margin:10px 0 0' }, h('b', null, '레퍼런스 먼저. '), `인물 × 복장마다 한 장씩, 모두 ${refPlan.length}장을 그리고 멈춥니다. 확인한 뒤에 나머지를 그립니다.`) : null,
                refView ? h('div', { class: 'as-g', style: 'margin-top:10px' }, refPlan.map(t => tile(t, `${t.e.name} · ${t.o.ko}`))) : null,
                !refView && showing ? ofSeg() : null,
                !refView && showing ? h('div', { class: 'as-g', style: 'margin-top:10px' }, tasks.map(t => tile(t))) : null,
                rzBlock(),
            ];
        };

        const total = acTotal(a);
        add(pane,
            step(1, '인물 고르기', `${cs.map(e => e.name).join(' · ')} · ${cs.length}명`, noCast ? sNoCast : sPick),
            step(2, '복장 고르기', acOutfitLabel(a), sOutfit),
            step(3, '에셋 개수', `에셋 ${emos.length}개 · 총 ${total}장`, sCount),
            step(4, '감정 에셋 확인', `에셋 ${emos.length}종${hasSp ? ` · 특수 ${sp.icon} ${sp.ko}` : ''}`, sSpecial),
            step(5, '작가 고르기', `${acPreset().name} · ${tidy(a.view.split(',')[0]) || '시점 없음'}`, sArtist),
            step(6, 'NAI 모델 고르기', `${modelName(st.set.model)} · 레퍼런스 ${a.ref ? '켬' : '끔'}`, sModel),
            step(7, '글로벌노트', ptOff ? '꺼 둠' : a.gnEdited ? '직접 고친 글' : '자동으로 쓴 글', sNote),
            step(8, '애드 에셋', !left.length && plan.length ? `${plan.length}장 완료` : '', sRun),
            refCheck && !noCast && a.step >= 8 ? h('div', { class: 'rc-bar' },
                h('button', { class: 'ix-btn main', type: 'button', disabled: busyElse || acs.cu, onclick: () => acStart(a, left) },
                    busyElse ? '다른 봇을 그리는 중입니다' : `✔ 이대로 나머지 ${left.length}장 그리기`),
                h('small', null, `${left.length}장 · 약 ${fmtLeft(left.length * acAvg())}` + (acs.an != null ? ` · 남은 Anlas ${acs.an.toLocaleString()}` : ''))) : null,
            acEditBox(a));
        return pane;
    }

    function renderAssetList() {
        const v = st.view;
        const pane = h('section', { class: 'ix-pane' });
        if (!v) { noChat(pane); return pane; }
        if (v.group) return add(pane, h('div', { class: 'ix-empty' }, h('b', null, '그룹 채팅에서는 애드 에셋을 쓸 수 없습니다'), '봇 하나의 채팅에서 열어 주세요.'));
        const a = acAst();
        if (!a) return add(pane, h('div', { class: 'ix-empty' }, '불러오는 중…'));
        const have = acHas(), names = acListNames(a), sl = acSlugs(a);
        const toMake = () => { ui.atab = 'make'; acs.menu = ''; renderNow(); };
        if (!names.length) {
            return add(pane, h('div', { class: 'ix-empty' }, h('b', null, '아직 그린 에셋이 없습니다'),
                h('button', { class: 'lnk', type: 'button', onclick: toMake }, '만들기 탭'), '에서 인물 · 복장 · 감정을 고르고 그려 주세요.'));
        }
        const okKo = new Map(acOutfitList(a).map(o => [o.key, o.ko]));
        const emRow = new Map(AC_EMO.map(([key, ko, icon]) => [key, { ko, icon }]));
        for (const m of a.custom?.emos ?? []) if (!emRow.has(m.key)) emRow.set(m.key, { ko: m.ko, icon: m.icon });
        for (const s of [...acSpecialList(a), acSpecial(a)]) if (!emRow.has(s.key)) emRow.set(s.key, { ko: s.ko, icon: s.icon || '✨', sp: true });

        const groups = new Map();
        for (const n of names) {
            const m = /^c_([a-z0-9]+)_([a-z0-9]+)_([a-z0-9]+)$/.exec(n);
            if (!m) continue;
            const [, slug, okey, ekey] = m;
            if (!groups.has(slug)) {
                const e = acCast().find(x => sl[x.id] === slug) ?? null;
                groups.set(slug, { slug, e, name: e?.name ?? a.slugBy[slug] ?? slug, list: [] });
            }
            groups.get(slug).list.push({ n, okey, ekey, path: have.get(n) });
        }
        const gs = [...groups.values()];
        if (!groups.has(acs.lw)) acs.lw = 'all';
        const busy = !!acs.run;
        const say = (msg, ok) => { acs.msg = msg; acs.msgOk = ok; renderNow(); };
        const chips = gs.length > 1 ? h('div', { class: 'vw', role: 'tablist', 'aria-label': '보는 인물' },
            h('button', { type: 'button', role: 'tab', class: acs.lw === 'all' ? 'sel' : '', 'aria-selected': acs.lw === 'all' ? 'true' : 'false', style: 'padding-left:10px', onclick: () => { acs.lw = 'all'; acs.menu = ''; renderNow(); } },
                h('b', null, '전체'), h('small', null, `${names.length}장`)),
            gs.map(g => h('button', { type: 'button', role: 'tab', class: acs.lw === g.slug ? 'sel' : '', 'aria-selected': acs.lw === g.slug ? 'true' : 'false', onclick: () => { acs.lw = g.slug; acs.menu = ''; renderNow(); } },
                h('span', { class: 'cc-av', style: `background:${g.e ? acHue(g.e) : '#8a909b'} !important` }, acInitial(g.name)),
                h('b', null, g.name), h('small', null, `${g.list.length}장`)))) : null;
        const copy = async text => {
            try { await navigator.clipboard.writeText(text); say(`${text} 을(를) 복사했습니다.`, true); } catch { say('복사하지 못했습니다. 이름을 길게 눌러 직접 복사해 주세요.', false); }
        };
        const tile = (g, t) => {
            const emo = emRow.get(t.ekey) ?? { ko: t.ekey, icon: '🖼️' };
            const id = 'L:' + t.n, open = acs.menu === id && !busy;
            const cur = acs.run?.cur?.name === t.n && !acs.run.stop;
            const item = (label, small, fn, cls) => h('button', { type: 'button', class: cls, onclick: () => { acs.menu = ''; fn(); } }, h('b', null, label), h('small', null, small));

            const task = open ? acTaskOf(a, g.e, g.slug, t.n) : null;
            const menu = open ? h('div', { class: 'menu as-menu', role: 'menu' },
                item('크게 보기', '그림을 크게 엽니다', () => { renderNow(); void showBig(t.path); }),
                task ? item('🔁 다시 그리기', a.prompts[t.n] ? '고친 프롬프트 그대로 이 한 장만 새로' : '같은 프롬프트로 이 한 장만 새로', () => { if (!acStart(a, [task], true)) say('지금은 그릴 수 없습니다. 다른 그림을 다 그린 뒤에 눌러 주세요.', false); }) : null,
                task ? item('📝 프롬프트 고쳐 다시 그리기', '본 · 캐릭터 칸 · 부정 프롬프트를 직접 고칩니다', () => { acs.pe = { chaId: v.chaId, slug: g.slug, name: t.n, draft: null }; renderNow(); }) : null,
                item('이름 복사', `{{image::${t.n}}}`, () => void copy(`{{image::${t.n}}}`)),
                g.e ? item('지우기', `봇 에셋에서 ${t.n}을(를) 뺍니다`, () => {
                    void acEnqueue(() => acDelete(a, t.n, g.e, g.slug, v.ci, v.chaId))
                        .then(r => say(`${t.n}을(를) 봇 에셋에서 뺐습니다.` + (r.note === 'cut' ? ' 글로벌노트의 이매진 에셋 칸도 뺐습니다.' : ''), true))
                        .catch(error => say(`지우지 못했습니다: ${error?.message ?? error}`, false));
                }, 'del') : null) : null;
            return h('div', { class: 'as-t' + (open ? ' on' : '') },
                h('button', {
                    class: 'as-b', type: 'button', 'aria-label': `${g.name} ${emo.ko} 메뉴`, disabled: busy,
                    onclick: () => { acs.menu = open ? '' : id; renderNow(); },
                },
                cur ? h('div', { class: 'as-im cur' }, h('i'), h('em', null, '그리는 중'), h('b', { class: 'sh' }))
                    : h('div', { class: 'as-im ok' }, h('img', { 'data-path': t.path, alt: t.n })),
                emo.sp ? h('span', { class: 'bdg bdg-sp' }, '특수') : null,
                h('span', { class: 'as-cap' }, h('b', null, `${emo.icon} ${emo.ko}`, a.prompts[t.n] ? AC_ED_BDG() : null), h('code', { title: t.n }, t.n))),
                menu);
        };
        const group = g => {
            const byO = new Map();
            for (const t of g.list) { if (!byO.has(t.okey)) byO.set(t.okey, []); byO.get(t.okey).push(t); }
            const hash = g.e && g.slug === acHashSlug(g.e);
            const fix = hash ? h('div', { class: 'al-fix' },
                h('span', null, '이름 키 ', h('code', null, g.slug), '는 영어 이름이 아닙니다. ', h('b', null, acSlugBase(a, g.e)), '(으)로 바꾸면 그림 이름 · 로어북 · 글로벌노트가 함께 바뀝니다. 지난 채팅에 이미 나온 옛 이름 그림은 다시 뜨지 않습니다.'),
                busy ? h('button', { class: 'ix-btn sm', type: 'button', disabled: true }, '그리는 중') : armButton('영어 이름으로 바꾸기', '한 번 더 누르면 바꿉니다', () => {
                    void acEnqueue(() => acRename(a, g.e, g.slug, v.ci, v.chaId))
                        .then(r => { if (acs.lw === g.slug) acs.lw = r.to; say(`${g.name} 그림 ${r.n}장의 이름을 c_${r.to}_… 로 바꿨습니다.` + (r.note === 'put' ? ' 글로벌노트의 이매진 에셋 칸도 새 이름으로 바꿨습니다.' : r.note === 'cut' ? ' 글로벌노트의 이매진 에셋 칸은 뺐습니다(고른 에셋을 다 그리면 다시 넣습니다).' : ''), true); })
                        .catch(error => say(`바꾸지 못했습니다: ${error?.message ?? error}`, false));
                }, 'ix-btn sm main')) : null;
            return h('section', { class: 'al-grp' },
                h('div', { class: 'al-hd' },
                    h('span', { class: 'cc-av', style: `background:${g.e ? acHue(g.e) : '#8a909b'} !important` }, acInitial(g.name)),
                    h('b', null, g.name), h('code', null, `c_${g.slug}_*`), h('small', null, `${g.list.length}장`),
                    g.e ? null : h('span', { class: 'gone', title: '등장인물 탭에서 빠진 인물입니다. 다시 넣으면 지울 수 있습니다' }, '등장인물에서 빠짐')),
                fix,
                [...byO].map(([okey, ts]) => [
                    h('div', { class: 'al-of' }, okKo.get(okey) ?? okey, h('small', null, `${okey} · ${ts.length}장`)),
                    h('div', { class: 'as-g' }, ts.map(t => tile(g, t))),
                ]));
        };
        return add(pane,
            h('div', { class: 'al-top' },
                h('p', { class: 'ix-hint' }, `이매진이 그려 봇에 넣은 에셋 ${names.length}장 · 인물 ${gs.length}명. 그림을 누르면 크게 보기 · 다시 그리기 · 프롬프트 고치기 · 이름 복사 · 지우기 메뉴가 열립니다.`),
                h('button', { class: 'ix-btn sm', type: 'button', onclick: toMake }, '＋ 더 만들기')),
            acs.run ? h('div', { class: 'ix-acts', style: 'margin:0 0 10px' }, acStopGauge(acs.run)) : null,

            h('p', { class: 'ix-hint', style: 'color:var(--bad);margin:0 0 8px' }, '그림을 불러오는 동안에는 깨진 그림처럼 보일 수 있습니다. 잠시 기다리면 나타납니다.'),
            chips,
            acs.msg ? h('div', { class: 'ix-msg' + (acs.msgOk ? ' ok ok-box' : ' err') }, acs.msg) : null,
            gs.filter(g => acs.lw === 'all' || acs.lw === g.slug).map(group),
            acPromptBox(a));
    }

    function acPromptBox(a) {
        const pe = acs.pe, v = st.view;
        if (!pe) return null;
        const e = pe.chaId === v?.chaId ? acCast().find(x => acSlugs(a)[x.id] === pe.slug) : null;
        const t = acTaskOf(a, e, pe.slug, pe.name);
        if (!t) { acs.pe = null; return null; }
        const auto = acAutoPrompt(a, t), saved = a.prompts[t.name] ?? auto;
        const d = pe.draft ??= { ...saved };
        const same = x => ['base', 'neg', 'slot'].every(k => tidy(d[k]) === tidy(x[k]));
        const busy = !!acs.run || !!acs.cu;
        const close = () => { acs.pe = null; renderNow(); };
        const go = () => {
            if (busy) return;
            acSetPrompt(a, t, d);
            saveAst(v.chaId);
            acs.pe = null;
            if (!acStart(a, [t], true)) { acs.msg = '프롬프트는 저장했지만 지금은 그릴 수 없습니다. 다른 그림을 다 그린 뒤에 「다시 그리기」를 눌러 주세요.'; acs.msgOk = false; renderNow(); }
        };
        const copy = async () => {
            const text = `[본 프롬프트]\n${d.base}\n\n[캐릭터 칸 · ${t.e.name}]\n${d.slot}\n\n[부정 프롬프트]\n${d.neg}`;
            try { await navigator.clipboard.writeText(text); pe.note = '복사했습니다.'; } catch { pe.note = '복사하지 못했습니다. 칸을 눌러 직접 복사해 주세요.'; }
            renderNow();
        };

        const goBtn = h('button', { class: 'ix-btn main', type: 'button', onclick: go }, busy ? '다른 그림을 그리는 중' : '✏️ 저장 후 재생성');
        const undoBtn = h('button', { class: 'ix-btn', type: 'button', onclick: () => { pe.draft = { ...saved }; pe.note = ''; renderNow(); } }, '↩ 고치기 전으로');
        const autoBtn = h('button', { class: 'ix-btn', type: 'button', onclick: () => { pe.draft = { ...auto }; pe.note = ''; renderNow(); } }, '자동 프롬프트 불러오기');
        const stateTx = h('p', { class: 'ix-hint', style: 'margin:6px 0 0' });
        const sync = () => {
            const dirty = !same(saved);
            goBtn.disabled = busy || !(tidy(d.base) || tidy(d.slot));
            undoBtn.disabled = !dirty;
            autoBtn.style.display = same(auto) ? 'none' : '';
            stateTx.style.color = dirty ? '#b45309' : '';
            stateTx.textContent = dirty ? '고친 곳이 있습니다. 「저장 후 재생성」을 누르기 전에는 저장되지 않습니다.'
                : a.prompts[t.name] ? '직접 고친 프롬프트로 그립니다. 「자동 프롬프트 불러오기」를 누른 뒤 다시 그리면 자동 프롬프트로 돌아갑니다.'
                : '자동으로 만든 프롬프트입니다. 아직 고친 곳이 없습니다.';
        };
        const ta = (k, label, rows) => h('textarea', {
            class: 'cf-ta', rows, spellcheck: 'false', 'aria-label': label, value: d[k],
            oninput: ev => { d[k] = ev.target.value; sync(); },
        });
        sync();

        const rn = acRefName(a, t.e, t.slug, t.o);
        const refLine = !a.ref ? '레퍼런스를 끈 봇이라 레퍼런스 그림 없이 그립니다.'
            : rn === t.name ? '이 그림이 이 묶음의 레퍼런스라 레퍼런스 그림 없이 그립니다.'
            : acHas().has(rn) ? `레퍼런스 그림 ${rn}을(를) 함께 넣어 그립니다.` : '레퍼런스 그림이 아직 없어 레퍼런스 없이 그립니다.';
        return h('div', { class: 'ac-ov', onclick: ev => { if (ev.target === ev.currentTarget) close(); } },
            h('div', { class: 'dlg', role: 'dialog', 'aria-modal': 'true', 'aria-label': `${t.emo.ko} 프롬프트 고치기` },
                h('div', { class: 'dlg-h' }, h('span', null, `📝 ${t.e.name} · ${t.o.ko} · ${t.emo.icon || ''} ${t.emo.ko} · `, h('code', null, t.name)),
                    h('button', { class: 'ix-x', type: 'button', 'aria-label': '닫기', onclick: close }, '×')),
                h('div', { class: 'dlg-b' },
                    h('p', { class: 'ix-hint', style: 'margin:0 0 8px' }, '이 그림 한 장의 프롬프트입니다. 저장한 프롬프트는 이 그림을 다시 그릴 때마다 씁니다(준비 탭의 다시 그리기 포함).'),
                    h('h3', { class: 'sub' }, '본 프롬프트 ', h('small', null, '작가 · 구도 · 배경')),
                    ta('base', '본 프롬프트', 4),
                    h('h3', { class: 'sub' }, `캐릭터 칸 · ${t.e.name} `, h('small', null, '외형 · 복장 · 감정 · 자세')),
                    ta('slot', '캐릭터 칸', 5),
                    h('h3', { class: 'sub' }, '부정 프롬프트'),
                    ta('neg', '부정 프롬프트', 4),
                    h('p', { class: 'ix-hint', style: 'margin:6px 0 0' }, refLine),
                    stateTx,
                    pe.note ? h('p', { class: 'ix-hint', style: 'margin:6px 0 0' }, pe.note) : null,
                    h('div', { class: 'ix-acts' }, goBtn, undoBtn, autoBtn, h('button', { class: 'ix-btn', type: 'button', onclick: () => void copy() }, '📋 복사')))));
    }

    function goneSection(v, shown) {
        const pane = h('div', { class: 'gone-all' });
        const found = acs.gone?.chaId === v.chaId ? acs.gone : null;
        if (!found) { void goneScan(); return add(pane, h('div', { class: 'gal-empty' }, '지운 채팅방 · 답변에 있던 그림을 찾는 중…')); }
        const g = { ...found, list: found.list.filter(t => !shown.has(String(t.name).toLowerCase())) };
        const drawing = !!st.busy || jobsOn.size > 0;
        const busy = drawing || !!acs.run || !!acs.goneRun;
        const say = (msg, ok) => { acs.goneMsg = msg; acs.goneOk = ok; renderNow(); };
        const del = names => {
            acs.menu = '';
            void acEnqueue(() => goneDelete(names))
                .then(n => { say(n ? `그림 ${n}장을 봇 에셋에서 뺐습니다.` : '뺄 그림이 없었습니다. 그 사이 다시 쓰인 그림은 남겨 둡니다.', true); return refreshView().catch(() => {}).then(goneScan); })
                .catch(error => say(`지우지 못했습니다: ${error?.message ?? error}`, false));
        };
        const when = at => at ? new Date(at).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
        const tile = t => {
            const id = 'G:' + t.name, open = acs.menu === id && !busy;
            const item = (label, small, fn, cls) => h('button', { type: 'button', class: cls, onclick: () => { acs.menu = ''; fn(); } }, h('b', null, label), h('small', null, small));
            const menu = open ? h('div', { class: 'menu as-menu', role: 'menu' },
                item('크게 보기', '그림을 크게 엽니다', () => { renderNow(); void showBig(t.path); }),
                item('지우기', `봇 에셋에서 ${t.name}을(를) 뺍니다`, () => del([t.name]), 'del')) : null;
            return h('div', { class: 'as-t' + (open ? ' on' : '') },
                h('button', {
                    class: 'as-b', type: 'button', 'aria-label': `${t.title || t.name} 메뉴`, disabled: busy, title: t.excerpt || '',
                    onclick: () => { acs.menu = open ? '' : id; renderNow(); },
                },
                h('div', { class: 'as-im ok' }, h('img', { 'data-path': t.path, alt: t.name })),
                h('span', { class: 'as-cap' }, h('b', null, t.title || '제목 없음'), h('code', { title: t.name }, when(t.at) || t.name))),
                menu);
        };
        const again = h('button', { class: 'ix-btn sm', type: 'button', disabled: !!acs.goneRun, onclick: () => { acs.gone = null; acs.goneMsg = ''; renderNow(); } }, '다시 찾기');
        const all = !g.list.length ? null : busy ? h('button', { class: 'ix-btn sm', type: 'button', disabled: true }, `모두 지우기 (${g.list.length}장)`)
            : armButton(`모두 지우기 (${g.list.length}장)`, '한 번 더 누르면 모두 지웁니다', () => del(g.list.map(t => t.name)));
        return add(pane,
            h('div', { class: 'al-top' },
                h('p', { class: 'ix-hint' }, g.list.length
                    ? `이 봇의 어느 채팅에도 나오지 않는 이매진 그림 ${g.list.length}장입니다. 지운 채팅방 · 답변에 있던 그림이고, 지우면 봇 에셋과 갤러리 기록에서 빠집니다. 그림을 누르면 크게 보기 · 지우기 메뉴가 열립니다.`
                    : shown.size ? '다른 채팅방에서 지운 그림은 없습니다.' : '지운 채팅방 · 답변에 남은 그림이 없습니다.'),
                h('div', { style: 'display:flex;gap:6px;flex-wrap:wrap' }, again, all)),
            drawing ? h('p', { class: 'ix-hint', style: 'color:var(--bad);margin:0 0 8px' }, '그리는 중에는 지울 수 없습니다. 다 그린 뒤에 「다시 찾기」를 눌러 주세요.') : null,
            g.err ? h('div', { class: 'ix-msg err' }, `찾지 못했습니다: ${g.err}`) : null,
            acs.goneMsg ? h('div', { class: 'ix-msg' + (acs.goneOk ? ' ok ok-box' : ' err') }, acs.goneMsg) : null,
            g.list.length ? h('div', { class: 'as-g' }, g.list.map(tile)) : null);
    }

    const acOvOf = (a, slug, ekey) => Object.keys(a.prompts).filter(n => n.startsWith(`c_${slug}_`) && n.endsWith(`_${ekey}`) && n.split('_').length === 4);

    function acEditBox(a) {
        const ed = acs.edit;
        if (!ed) return null;
        const e = acCast().find(x => x.id === ed.cid), emo = acEmos(a).find(x => x.key === ed.ekey);
        const o = acOutfitList(a).find(x => x.key === ed.okey) ?? AC_BASE_OUTFIT;
        if (!e || !emo) { acs.edit = null; return null; }
        const slug = acSlugs(a)[e.id], name = acName(slug, o.key, emo.key);
        const close = () => { acs.edit = null; renderNow(); };

        const ta = h('textarea', {
            class: 'cf-ta', rows: 3, spellcheck: 'false', 'aria-label': '감정 · 자세 태그', value: ed.draft ?? acPrompt(a, e, emo),
            disabled: !!ed.busy, oninput: ev => { ed.draft = ev.target.value; },
        });
        const put = () => {
            const v = tidy(ed.draft ?? acPrompt(a, e, emo));
            const k = `${e.id}|${emo.key}`, was = a.edits[k] ?? emo.en;
            if (!v || v === emo.en) delete a.edits[k]; else a.edits[k] = v;

            const ovs = (a.edits[k] ?? emo.en) !== was ? acOvOf(a, slug, emo.key) : [];
            for (const n of ovs) delete a.prompts[n];
            saveAst(st.view.chaId);
            acs.edit = null;
            if (ovs.length) { acs.msg = `에셋 목록에서 직접 고친 「${emo.ko}」 프롬프트 ${ovs.length}개를 지웠습니다. 다시 그리면 새 태그로 그립니다.`; acs.msgOk = true; }
            renderNow();
        };
        return h('div', { class: 'ac-ov', onclick: ev => { if (ev.target === ev.currentTarget) close(); } },
            h('div', { class: 'dlg', role: 'dialog', 'aria-modal': 'true', 'aria-label': `${emo.ko} 프롬프트` },
                h('div', { class: 'dlg-h' }, h('span', null, `${emo.icon} ${emo.ko} 프롬프트 · `, h('code', null, name)),
                    h('button', { class: 'ix-x', type: 'button', 'aria-label': '닫기', onclick: close }, '×')),
                h('div', { class: 'dlg-b' },
                    h('h3', { class: 'sub' }, '고정 외형 ', h('small', null, '로어북 「이름 외형」에서 가져옵니다 · 여기서는 못 고칩니다')),
                    h('div', { class: 'cc-tags' }, identTags(e.type, e.look, acWear(e, o)).filter(Boolean).join(', ')),
                    h('h3', { class: 'sub' }, '감정 · 자세 ', h('small', null, '이 칸만 고칩니다')),
                    ta,
                    ed.err ? h('p', { class: 'ix-hint', style: 'margin:6px 0 0;color:#b91c1c' }, `태그를 새로 받지 못했습니다: ${ed.err}`) : null,
                    h('p', { class: 'ix-hint', style: 'margin:6px 0 0' }, '저장한 태그는 이 칸을 다시 그릴 때부터 씁니다.'),
                    acOvOf(a, slug, emo.key).length ? h('p', { class: 'ix-hint', style: 'margin:6px 0 0;color:#b45309' }, `이 감정에는 에셋 목록에서 프롬프트를 직접 고친 그림이 ${acOvOf(a, slug, emo.key).length}장 있습니다. 태그를 바꿔 저장하면 고친 프롬프트를 지우고 새 태그로 그립니다.`) : null,
                    h('div', { class: 'ix-acts' },
                        h('button', { class: 'ix-btn main', type: 'button', disabled: !!ed.busy, onclick: put }, '저장'),
                        h('button', { class: ed.busy ? 'ix-btn run' : 'ix-btn', type: 'button', disabled: !!ed.busy, onclick: () => void acRegenTags(a, ed) }, ed.busy ? [h('span', { class: 'gf' }), '태그 만드는 중', loadDots()] : '태그 재생성')))));
    }

    await loadPrefs();
    const panelButton = await api.registerButton({
        name: '🎨 이매진', icon: ICON_SVG, iconType: 'html', location: 'chat', id: 'nai-comic-panel',
    }, () => {
        openPanel().catch(error => console.error(LOG, 'panel', error));
    });

    let displayOn = false;
    try {
        await api.addRisuScriptHandler('display', ncDisplay);
        displayOn = true;
    } catch (error) {
        console.warn(LOG, 'display handler', error);
    }
    if (needRoot()) void rootQueue(startRoot);

    void naiKey().then(() => rootQueue(() => paintBusy(true))).catch(() => {});

    let outputOn = false;
    try {
        await api.addRisuScriptHandler('output', onOutputText);
        outputOn = true;
    } catch (error) {
        console.warn(LOG, 'output handler', error);
    }
    let processOn = false;
    try {
        await api.addRisuScriptHandler('process', stripProcess);
        processOn = true;
    } catch (error) {
        console.warn(LOG, 'process handler', error);
    }

    await api.addRisuChatListener('output', onOutput);
    await api.addRisuReplacer('beforeRequest', stripRequest);

    if (sizeMoved) void sizeChanged();
    await api.onUnload(async () => {
        try {
            ui.root?.remove();
            doc.getElementById('nai-comic-style')?.remove();
            doc.body.classList.remove('ix-on');
            for (const [target, type, fn] of domListeners.splice(0)) target.removeEventListener(type, fn);
            for (const p of thumbs.values()) p.then(url => URL.revokeObjectURL(url)).catch(() => {});
        } catch {}
        try { await api.removeRisuChatListener?.('output', onOutput); } catch {}
        try { await api.removeRisuReplacer?.('beforeRequest', stripRequest); } catch {}
        try { await api.unregisterUIPart(panelButton.id); } catch {}
        if (displayOn) try { await api.removeRisuScriptHandler?.('display', ncDisplay); } catch {}
        if (outputOn) try { await api.removeRisuScriptHandler?.('output', onOutputText); } catch {}
        if (processOn) try { await api.removeRisuScriptHandler?.('process', stripProcess); } catch {}
        clearTimeout(settleTimer);
        clearInterval(acs.timer);
        if (acs.run) { acs.run.stop = true; acs.run.onStop(); }
        await rootQueue(stopRoot);
    });
    if (globalThis.__NC_TEST__ === true) {
        globalThis.__NC_TEST__ = { st, acs, astCache, loadAst, acPlan, acReq, acLore, acSlugs, acEmos, acOutfits, acNoteText, acNoteInto, acSyncNote, acCutNote, acMine, acMineAll, botContext, setArtistThumb, withHead, isIllust, panelsOf, countNow, sizeNow, placeTags, findQuote, blockedRanges, tailStart, bubblesNow, ui, parseJson, jsonObjectAt, tryJson, unzipFirst, firstImage, buildReq, naiBody, countTags, guardTags, removeTokens, bubbleSlot, joinTags, stripOurs, stripProcess, stripRequest, msgHash, readState, writeStateInto, applyState, mergeCast, findCast, comicSystem, comicUser, findMsg, render, renderNow, openPanel, refreshView, runJob, enqueue, onOutput, plainText, grid, preset, DEFAULT_POS, DEFAULT_NEG, NEG_V12, figTag, figCss, ncDisplay, hideTargets, luaExcerpt, hidePrompt, checkHide, sortHide, applyHide, unhide, hasHide, botHidden, isTokenLimit, hideSlot, saveHide, runHide, runUnhide, hide, HIDE_SYSTEM, root, rootDenied, rootDoc, paintBusy, progressNow, cancelAll, tightenButtons, startRoot, stopRoot, syncRoot, placeButton, onRootClick, paintGen, genState, genClick, genHtml, setupDone, failed, jobsOn, figAction, removeImage, withVars, putVars, syncVars, redrawChat, sizeChanged, drawLatest, queued, setVal, sizeOk, loadPrefs, told, setNaiKey, goneScan, goneDelete };
    }
    console.log(LOG, `v${VERSION} ready`);
})().catch(error => {
    console.error('[이매진]', error);
});
