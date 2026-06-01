export default [
    // http utils
    {
        find_with: '"HTTPUtils"',
        paths: ['discord_common/js/packages/http-utils/HTTPUtils.tsx'],
    },
    // id gen
    {
        find_with: '.shiftRight(32).toJSNumber()',
        paths: ['discord_common/js/packages/id-generator/IdGenerator.tsx'],
    },
    // constants
    {
        find_with: ['phoneCountryCode', 'alpha2', 'Afghanistan', '+93', 'AF'],
        paths: ['discord_common/js/shared/Countries.tsx'],
    },
    {
        find_with: ['discord.com', 'HINT_PURPLE', '"#c9d2f0",'],
        paths: ['discord_common/js/shared/Constants.tsx'],
    },
    // mfa
    {
        find_with: ['X-Discord-MFA-Authorization', '.post'],
        paths: ['discord_common/js/shared/MFA.tsx'],
    },
    // lotte icon
    {
        find_with: ['--__lottieIconColor'],
        paths: [
            'discord_web/design/components/LottieIcon/native/LottieIcon.tsx',
        ],
    },
    // apex experiments
    {
        find_with: ['=', '__installation__'],
        paths: ['discord_web/modules/experiments/apex/ApexTypes.tsx'],
    },
    {
        find_with: ['.get', '.APEX_EXPERIMENTS_METADATA', 'surface:'],
        paths: ['discord_web/modules/experiments/apex/ApexActionCreators.tsx'],
    },
    {
        find_with: [
            'getInstallationForTracking',
            'getId',
            'guildId',
            'installation',
            'registerExperiment',
        ],
        paths: ['discord_common/js/packages/apex/ApexExperiment.tsx'],
    },
    {
        find_with: [
            'Installation',
            'User',
            'Guild',
            'IsOverride',
            '2031446579660906796',
        ],
        paths: ['discord_common/js/packages/apex/ApexTypes.tsx'],
    },
    // fingerprints
    {
        // \i is automatically replaced with a regex pattern
        find_with: [/return\s*\w.split(".")[0]/, '==', 'null', '?'],
        paths: [
            'discord_common/js/packages/fingerprint-utils/FingerprintUtils.tsx',
        ],
    },
    // messages actions creator
    {
        find_with: [
            'sendMessage',
            'Waiting for channel ',
            'to to be ready before sending.',
        ],
        paths: ['discord_web/actions/MessageActionCreators.tsx'],
    },
];
