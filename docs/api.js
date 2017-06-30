YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "contact",
        "make-range",
        "md-address",
        "md-array-table",
        "md-boolean",
        "md-button-modal",
        "md-card",
        "md-citation-array",
        "md-codelist",
        "md-codelist-multi",
        "md-contact-link",
        "md-contact-title",
        "md-datetime",
        "md-definition",
        "md-graphic-array",
        "md-identifier-array",
        "md-input",
        "md-input-confirm",
        "md-inputs",
        "md-markdown-editor",
        "md-object-table",
        "md-online-resource-array",
        "md-phone-array",
        "md-scroll-spy",
        "md-select",
        "md-select-contact",
        "md-select-thesaurus",
        "md-simple-array-table",
        "md-textarea",
        "md-toggle",
        "object-template",
        "tree-branch",
        "tree-label",
        "tree-leaf",
        "tree-search",
        "tree-view"
    ],
    "modules": [
        "components-control",
        "components-input",
        "components-layout",
        "components-object",
        "data-models",
        "ember-json-tree",
        "helpers",
        "mdeditor",
        "mixins",
        "tree-search",
        "tree-view"
    ],
    "allModules": [
        {
            "displayName": "components-control",
            "name": "components-control",
            "description": "Components used as UI controls."
        },
        {
            "displayName": "components-input",
            "name": "components-input",
            "description": "Specialized select list control for displaying and selecting\noptions in mdCodes codelists.\nAccess to codelists is provided by the 'codelist' service.\nDescriptions of all codes (tooltips) are embedded within the codelists.\n\n```handlebars\n\\{{input/md-codelist\n  create=true\n  required=false\n  tooltip=fasle\n  icon=false\n  disabled=false\n  allowClear=true\n  showValidations=true\n  mdCodeName=\"codeName\"\n  value=value\n  path=\"path\"\n  model=model\n  placeholder=\"Choose\"\n}}\n```"
        },
        {
            "displayName": "components-layout",
            "name": "components-layout",
            "description": "Component that renders a Bootstrap card."
        },
        {
            "displayName": "components-object",
            "name": "components-object",
            "description": "mdEditor class for input and edit of mdJSON 'address' object\narrays. The class manages the maintenance of an array of address\nobjects using the md-object-table class."
        },
        {
            "displayName": "data-models",
            "name": "data-models",
            "description": "Models for the mdEditor data store"
        },
        {
            "displayName": "ember-json-tree",
            "name": "ember-json-tree",
            "description": "Renders JSON tree structures. Also provides a seach component."
        },
        {
            "displayName": "helpers",
            "name": "helpers",
            "description": "Create an array with the index defined by the start and end params"
        },
        {
            "displayName": "mdeditor",
            "name": "mdeditor",
            "description": "The mdEditor application instance."
        },
        {
            "displayName": "mixins",
            "name": "mixins",
            "description": "Mixins."
        },
        {
            "displayName": "tree-search",
            "name": "tree-search",
            "description": "Renders a search form and results for JSON trees."
        },
        {
            "displayName": "tree-view",
            "name": "tree-view",
            "description": "Renders JSON tree structures."
        }
    ],
    "elements": []
} };
});