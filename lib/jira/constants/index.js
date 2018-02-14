/**
 * Function to return String from a base64 value
 */
const getBase64String = (input) => {
        return new Buffer(input, 'base64').toString('ascii');
    },

    /**
     * Config data for the Jira instance
     */
    jiraConstants = [
        'http',
        'jira',
        '8080',
        getBase64String("XXXXXXXXX"),
        getBase64String("XXXXXXXXX"),
        '2'
    ],

    /**
     * Mapping ticket type to relevant Id
     */
    ticketTypeEnum = {
        EPIC : 34,
        BUG : 1,
        STORY : 33
    },

    jiraProjectMapping = [
        {
          "key": "AO",
          "id": "10104"
        },
        {
          "key": "AL",
          "id": "10500"
        },
        {
          "key": "ATP",
          "id": "14560"
        },
        {
          "key": "AMV",
          "id": "10108"
        },
        {
          "key": "ASL",
          "id": "13860"
        },
        {
          "key": "ARCH",
          "id": "14760"
        },
        {
          "key": "ARQ",
          "id": "12062"
        },
        {
          "key": "AV",
          "id": "10080"
        },
        {
          "key": "AFM",
          "id": "14860",
          "affected" : "10758"
        },
        {
          "key": "BX",
          "id": "10263"
        },
        {
          "key": "IW",
          "id": "10862"
        },
        {
          "key": "BSIWM",
          "id": "13260"
        },
        {
          "key": "BSSM",
          "id": "13060"
        },
        {
          "key": "BFM",
          "id": "14861"
        },
        {
          "key": "CFII",
          "id": "13762"
        },
        {
          "key": "CG",
          "id": "10240"
        },
        {
          "key": "CB",
          "id": "13861"
        },
        {
          "key": "CAR",
          "id": "10272"
        },
        {
          "key": "CHK",
          "id": "11860"
        },
        {
          "key": "CS",
          "id": "10159"
        },
        {
          "key": "WOBBC",
          "id": "10158"
        },
        {
          "key": "WO",
          "id": "10090"
        },
        {
          "key": "CE",
          "id": "10306"
        },
        {
          "key": "CA",
          "id": "15365"
        },
        {
          "key": "BC",
          "id": "11760"
        },
        {
          "key": "CBW",
          "id": "15260"
        },
        {
          "key": "CCFII",
          "id": "13763"
        },
        {
          "key": "CCS",
          "id": "12860"
        },
        {
          "key": "CH",
          "id": "13460"
        },
        {
          "key": "CHT",
          "id": "15360"
        },
        {
          "key": "CLIHRG",
          "id": "12660"
        },
        {
          "key": "CK",
          "id": "13760"
        },
        {
          "key": "CLIKM",
          "id": "12161"
        },
        {
          "key": "CPSL",
          "id": "12072"
        },
        {
          "key": "CPSS",
          "id": "12960"
        },
        {
          "key": "CLIPHJ",
          "id": "12460"
        },
        {
          "key": "CSG",
          "id": "14960"
        },
        {
          "key": "CSF",
          "id": "13362"
        },
        {
          "key": "CLISBEL",
          "id": "12068"
        },
        {
          "key": "CLISET",
          "id": "12064"
        },
        {
          "key": "CLISFIN",
          "id": "11862"
        },
        {
          "key": "CLISBDG",
          "id": "11661"
        },
        {
          "key": "CLISPOR",
          "id": "12067"
        },
        {
          "key": "CLISSPN",
          "id": "12066"
        },
        {
          "key": "CTB",
          "id": "15364"
        },
        {
          "key": "CTP",
          "id": "11561"
        },
        {
          "key": "CTFL",
          "id": "14160"
        },
        {
          "key": "CT",
          "id": "12075"
        },
        {
          "key": "CTGRP",
          "id": "13561"
        },
        {
          "key": "CW",
          "id": "13961"
        },
        {
          "key": "CLOUD",
          "id": "14161"
        },
        {
          "key": "MLS",
          "id": "10562"
        },
        {
          "key": "CIQ",
          "id": "14762"
        },
        {
          "key": "MLW",
          "id": "11968"
        },
        {
          "key": "CAWRP",
          "id": "15162"
        },
        {
          "key": "COM",
          "id": "13862",
          "affected": "16352",
          "component": "17427"
        },
        {
          "key": "COREMSG",
          "id": "10551"
        },
        {
          "key": "CM",
          "id": "10091"
        },
        {
          "key": "CMA",
          "id": "15361"
        },
        {
          "key": "CSMS",
          "id": "10092"
        },
        {
          "key": "CPA",
          "id": "11260"
        },
        {
          "key": "DEVBACK",
          "id": "14260"
        },
        {
          "key": "DPMCLXVII",
          "id": "12061"
        },
        {
          "key": "DX",
          "id": "10530"
        },
        {
          "key": "SMS",
          "id": "10204"
        },
        {
          "key": "EENV",
          "id": "15060"
        },
        {
          "key": "FFI",
          "id": "11261"
        },
        {
          "key": "BE",
          "id": "11460"
        },
        {
          "key": "FE",
          "id": "11861"
        },
        {
          "key": "FS",
          "id": "11761"
        },
        {
          "key": "MLI",
          "id": "11969"
        },
        {
          "key": "LBE",
          "id": "12763"
        },
        {
          "key": "FFLA",
          "id": "11960"
        },
        {
          "key": "MDL",
          "id": "11060"
        },
        {
          "key": "NSS",
          "id": "11362"
        },
        {
          "key": "FFP",
          "id": "11160"
        },
        {
          "key": "FIPS",
          "id": "12861"
        },
        {
          "key": "RS",
          "id": "13164"
        },
        {
          "key": "FAT",
          "id": "11966"
        },
        {
          "key": "FFIQDW",
          "id": "12073"
        },
        {
          "key": "FH",
          "id": "10141"
        },
        {
          "key": "FSI",
          "id": "10961"
        },
        {
          "key": "SET",
          "id": "12063"
        },
        {
          "key": "GTP",
          "id": "10341"
        },
        {
          "key": "GSH",
          "id": "10111"
        },
        {
          "key": "RTM",
          "id": "13365"
        },
        {
          "key": "BII",
          "id": "13366"
        },
        {
          "key": "HFP",
          "id": "13369"
        },
        {
          "key": "HNST",
          "id": "14060"
        },
        {
          "key": "HRG",
          "id": "10861"
        },
        {
          "key": "VIMFIQ",
          "id": "12764"
        },
        {
          "key": "IS",
          "id": "10210"
        },
        {
          "key": "IN",
          "id": "13364"
        },
        {
          "key": "JCA",
          "id": "10510"
        },
        {
          "key": "KER",
          "id": "10960"
        },
        {
          "key": "KMFIM",
          "id": "12160"
        },
        {
          "key": "LO",
          "id": "13766"
        },
        {
          "key": "MM",
          "id": "10106"
        },
        {
          "key": "MSC",
          "id": "12864"
        },
        {
          "key": "MSS",
          "id": "10460"
        },
        {
          "key": "MULTISQS",
          "id": "14761"
        },
        {
          "key": "NPA",
          "id": "10511"
        },
        {
          "key": "NSA",
          "id": "10480"
        },
        {
          "key": "OSE",
          "id": "13661"
        },
        {
          "key": "PLS",
          "id": "12074"
        },
        {
          "key": "PARARQ",
          "id": "12065"
        },
        {
          "key": "PD",
          "id": "13462"
        },
        {
          "key": "PJFI",
          "id": "12260"
        },
        {
          "key": "PQ",
          "id": "13960"
        },
        {
          "key": "PSCALE",
          "id": "13360"
        },
        {
          "key": "PMO",
          "id": "13764"
        },
        {
          "key": "PI",
          "id": "13962"
        },
        {
          "key": "RT",
          "id": "13163"
        },
        {
          "key": "SG",
          "id": "14361",
          "affected": "15555",
          "component": "17902"          
        },
        {
          "key": "SFII",
          "id": "13361",
          "affected": "14252",
          "component": "16288"    
        },
        {
          "key": "SSP",
          "id": "13165"
        },
        {
          "key": "SMT",
          "id": "10442"
        },
        {
          "key": "SPH",
          "id": "13363"
        },
        {
          "key": "STP",
          "id": "10393"
        },
        {
          "key": "LCHS",
          "id": "14461"
        },
        {
          "key": "SD",
          "id": "15363"
        },
        {
          "key": "SO",
          "id": "12961"
        },
        {
          "key": "SOT",
          "id": "12863"
        },
        {
          "key": "SIG",
          "id": "11363"
        },
        {
          "key": "STM",
          "id": "14362"
        },
        {
          "key": "SIGTWO",
          "id": "11967"
        },
        {
          "key": "SDP",
          "id": "10371"
        },
        {
          "key": "SMBEF",
          "id": "10430"
        },
        {
          "key": "SF",
          "id": "10660"
        },
        {
          "key": "SSI",
          "id": "12071"
        },
        {
          "key": "STG",
          "id": "11560"
        },
        {
          "key": "SS",
          "id": "10270"
        },
        {
          "key": "SUS",
          "id": "10360"
        },
        {
          "key": "SBDINT",
          "id": "11563"
        },
        {
          "key": "SBDT",
          "id": "11562"
        },
        {
          "key": "SCA",
          "id": "10860"
        },
        {
          "key": "PROBTST",
          "id": "15362"
        },
        {
          "key": "SPT",
          "id": "14460"
        },
        {
          "key": "TBFM",
          "id": "14862"
        },
        {
          "key": "TB",
          "id": "10501"
        },
        {
          "key": "TCHIB",
          "id": "13765"
        },
        {
          "key": "TECHRAD",
          "id": "13161"
        },
        {
          "key": "TEC",
          "id": "13761"
        },
        {
          "key": "TF",
          "id": "12560"
        },
        {
          "key": "TTR",
          "id": "13160"
        },
        {
          "key": "TESTRT",
          "id": "13162"
        },
        {
          "key": "TBOS",
          "id": "12762"
        },
        {
          "key": "TFLBUS",
          "id": "10540"
        },
        {
          "key": "TFL",
          "id": "10390"
        },
        {
          "key": "TFLES",
          "id": "12360"
        },
        {
          "key": "TFLKEY",
          "id": "15161"
        },
        {
          "key": "TFLMI",
          "id": "11970"
        },
        {
          "key": "BCA",
          "id": "10262"
        },
        {
          "key": "TSA",
          "id": "11361",
          "affected" : "10758"
        },
        {
          "key": "TA",
          "id": "15366"
        },
        {
          "key": "TUN",
          "id": "11963"
        },
        {
          "key": "TP",
          "id": "13461"
        },
        {
          "key": "TT",
          "id": "12862"
        },
        {
          "key": "WS",
          "id": "14360"
        },
        {
          "key": "VCE",
          "id": "11360"
        },
        {
          "key": "WP",
          "id": "10130"
        },
        {
          "key": "WLC",
          "id": "10264"
        },
        {
          "key": "WLL",
          "id": "14463"
        },
        {
          "key": "WLLMI",
          "id": "14660"
        },
        {
          "key": "WG",
          "id": "14462"
        },
        {
          "key": "WOL",
          "id": "14162"
        },
        {
          "key": "WCS",
          "id": "15460"
        },
        {
          "key": "ITT",
          "id": "10440"
        }
      ];

module.exports = {jiraConstants, jiraProjectMapping, ticketTypeEnum}