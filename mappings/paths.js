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
        paths: ['.../discord_common/js/shared/DevtoolsExtension.tsx'],
    },
    // twemeoji
    {
        find_with: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@16.0.1/assets',
        paths: [
            'node_modules/.pnpm/@discordapp+twemoji@16.0.1/node_modules/@discordapp/twemoji/dist/twemoji.npm.js',
        ],
    },
];
