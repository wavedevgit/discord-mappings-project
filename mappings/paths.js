import sharedConstants from './paths.constants.js';

export default [
    ...sharedConstants,
    // http utils
    {
        find_with: '"HTTPUtils"',
        paths: ['../discord_common/js/packages/http-utils/HTTPUtils.tsx'],
    },
    // id gen
    {
        find_with: '.shiftRight(32).toJSNumber()',
        paths: ['../discord_common/js/packages/id-generator/IdGenerator.tsx'],
    },
    // constants
    {
        find_with: ['phoneCountryCode', 'alpha2', 'Afghanistan', '+93', 'AF'],
        paths: ['../discord_common/js/shared/Countries.tsx'],
    },
    {
        find_with: ['discord.com', 'HINT_PURPLE', '"#c9d2f0",'],
        paths: ['../discord_common/js/shared/Constants.tsx'],
    },
    // mfa
    {
        find_with: ['X-Discord-MFA-Authorization', '.post'],
        paths: ['../discord_common/js/shared/MFA.tsx'],
    },
    // lotte icon
    {
        find_with: ['--__lottieIconColor'],
        paths: ['app/design/components/LottieIcon/native/LottieIcon.tsx'],
    },
    // apex experiments
    {
        find_with: ['=', '__installation__'],
        paths: ['app/modules/experiments/apex/ApexTypes.tsx'],
    },
    {
        find_with: ['.get', '.APEX_EXPERIMENTS_METADATA', 'surface:'],
        paths: ['app/modules/experiments/apex/ApexActionCreators.tsx'],
    },
    {
        find_with: [
            'getInstallationForTracking',
            'getId',
            'guildId',
            'installation',
            'registerExperiment',
        ],
        paths: ['../discord_common/js/packages/apex/ApexExperiment.tsx'],
    },
    {
        find_with: [
            'Installation',
            'User',
            'Guild',
            'IsOverride',
            '2031446579660906796',
        ],
        paths: ['../discord_common/js/packages/apex/ApexTypes.tsx'],
    },
    // fingerprints
    {
        // \i is automatically replaced with a regex pattern
        find_with: [/return\s*\w.split(".")[0]/, '==', 'null', '?'],
        paths: [
            '../discord_common/js/packages/fingerprint-utils/FingerprintUtils.tsx',
        ],
    },
    // messages actions creator
    {
        find_with: [
            'sendMessage',
            'Waiting for channel ',
            'to to be ready before sending.',
        ],
        paths: ['app/actions/MessageActionCreators.tsx'],
    },
    // video player
    {
        find_with: ['PAUSED', 'PLAYBACK_COMPLETE', 'playback_complete'],
        paths: [
            '.../discord_common/js/packages/video-player/DiscordVideoPlayerTypes.tsx',
        ],
    },
    /** ../discord_common/js/shared/lib/ */
    // platform utils
    {
        find_with: ['iPad', 'navigator?.platform', 'MacIntel'],
        paths: ['../discord_common/js/shared/lib/PlatformUtils.tsx'],
    },
    // RPCError
    {
        find_with: ['RPCError', 'closeCode'],
        paths: ['../discord_common/js/shared/lib/RPCError.tsx'],
    },
    // token mananger
    {
        find_with: ['dQw4w9WgXcQ:', 'showToken', 'getToken'],
        paths: ['../discord_common/js/shared/lib/TokenManager.tsx'],
    },
    /** ../discord_common/js/shared/constants/ */
    {
        find_with: ['shift+tab', 'KEYBOARD_KEY', 'MOUSE_BUTTON'],
        paths: ['../discord_common/js/shared/constants/KeyboardConstants.tsx'],
    },
    {
        find_with: ['DEPRECATED_SIZE_60', 'BLACK', 'black', 'number'],
        paths: [
            '../discord_common/js/shared/constants/web/AvatarConstants.tsx',
        ],
    },
    /** ../discord_common/js/shared/config/colors/generated/ */
    {
        find_with: ['DARK', 'dark', 'MIDNIGHT', 'midnight'],
        paths: [
            '../discord_common/js/shared/config/colors/generated/ThemeTypes.tsx',
        ],
    },
    /** ../discord_common/js/shared/activities/utils/CustomActivityLinkUtils.tsx */
    {
        find_with: ['QUICK', 'type', 'encodedLinkId', 'decodedLinkId'],
        paths: [
            '../discord_common/js/shared/activities/utils/CustomActivityLinkUtils.tsx',
        ],
    },
    /** ../discord_common/js/shared/utils */
    {
        find_with: ['class', 'Number(BigInt.asUintN(', 'BigInt(1) <<'],
        paths: ['../discord_common/js/shared/utils/BigFlagUtils.tsx'],
    },
    {
        find_with: [
            'OculusBrowser',
            'window.WebSocket',
            'createEncodedStreams',
        ],
        paths: ['../discord_common/js/shared/utils/BrowserConstants.tsx'],
    },
    {
        find_with: ['.BdApi', '.Vencord', 'null', '=', 'window', '||'],
        paths: [
            '../discord_common/js/shared/utils/ClientModDetectionUtils.tsx',
        ],
    },
    {
        find_with: ['calc(var(--saturation-factor, 1) *'],
        paths: ['../discord_common/js/shared/utils/ColorUtils.tsx'],
    },
    {
        find_with: ['ComponentDispatch.resubscribe:', 'safeDispatch'],
        paths: ['../discord_common/js/shared/utils/ComponentDispatchUtils.tsx'],
    },
    {
        find_with: ['Unable to determine render window for element', 'Element'],
        paths: ['../discord_common/js/shared/utils/DOMUtils.tsx'],
    },
    // worst shit
    {
        find_with: [/return \(\w & \w\) === \w/, /return \w+ & \w+/],
        paths: ['../discord_common/js/shared/utils/FlagUtils.tsx'],
    },
    {
        find_with: [
            'class',
            'this.promise = new Promise',
            'this.resolve',
            'this.reject',
        ],
        paths: ['../discord_common/js/shared/utils/Future.tsx'],
    },
    {
        find_with: [
            'typeof globalThis',
            'typeof window',
            'typeof self',
            'Object.create',
        ],
        paths: ['../discord_common/js/shared/utils/GlobalUtils.tsx'],
    },
    {
        find_with: [
            'GLOBAL_ENV.WEBAPP_ENDPOINT',
            '?redirect_to=',
            'encodeURIComponent',
        ],
        paths: ['../discord_common/js/shared/utils/PathUtils.tsx'],
    },
    {
        find_with: ['(android ).+chrome/[.0-9]* mobile', 'LINUX', 'WEB'],
        paths: ['../discord_common/js/shared/utils/PlatformUtils.tsx'],
    },
    {
        find_with: ['.DISCORD_ORB', 'convertToMajorUnits'],
        paths: ['../discord_common/js/shared/utils/PriceUtils.tsx'],
    },
    {
        find_with: ['.unstable_batchedUpdates)'],
        // guessed file name from ReactBatchUpdates.native.tsx, its probably ReactBatchUpdates.tsx
        paths: ['../discord_common/js/shared/utils/ReactBatchUpdates.tsx'],
    },
    {
        find_with: ['size !==', 'for', '.has(', 'instanceof Set', 'new Set()'],
        paths: ['../discord_common/js/shared/utils/SetUtils.tsx'],
    },
    {
        find_with: ['Snowflake sequence number overflow:'],
        paths: ['../discord_common/js/shared/utils/SnowflakeUtils.tsx'],
    },
    /** app/utils/web/ */
    {
        find_with: ['lastImageSaveDirectory', 'discord_rpc'],
        paths: ['app/utils/web/DesktopNativeUtils.tsx'],
    },
    /** app/lib/spellcheck/ */
    {
        find_with: ['Not enough reliable text.', 'discord_spellcheck'],
        paths: ['app/lib/spellcheck/LanguageDetector.tsx'],
    },
    // content classifcation
    {
        find_with: [
            'AUTOMATED_CLASSIFICATION',
            'IS_ADULT_ONLY',
            'source',
            'status',
        ],
        paths: [
            '../discord_common/js/shared/modules/content_classification/lib/ContentClassificationToAgeRestriction.tsx',
        ],
    },
    // devtools
    {
        find_with: ['__DISCORD_DEVTOOLS'],
        paths: ['../discord_common/js/shared/DevtoolsExtension.tsx'],
    },
    // twemeoji
    {
        find_with: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets',
        paths: [
            'node_modules/.pnpm/@discordapp+twemoji@16.0.1/node_modules/@discordapp/twemoji/dist/twemoji.npm.js',
        ],
    },
];
