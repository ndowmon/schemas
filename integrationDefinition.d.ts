export interface IntegrationDefinition {
  '$schema': string;
  /**
   * A unique identifier (uuid) associated with the integration. All
   * `IntegrationInstance` records must be associated with an
   * `IntegrationDefinition` by this value.
   */
  id: string;
  /**
   * A unique name associated with the integration, used for ...
   */
  name: string;
  /**
   * Identifies the integration implementation type, such as `"managed_lambda"`.
   * See also `integrationType`.
   */
  type: string;
  /**
   * A unique title associated with the integration, used in presenting the
   * integration to users.
   *
   * This value is also used in UI code to associate input validation meta data
   * with the definition! WARNING: Changing this value currently requires
   * changing that UI code 😳
   */
  title: string;
  /**
   * The ARN of the Lambda function that receives
   * `IntegrationActionTriggerEvent`s.
   */
  lambdaFunctionArn: string;

  authSection?: {
    validationLambdaFunctionArn?: string;
    authConfigSections: ConfigSection[];
  };
  configSections?: ConfigSection[];
  /**
   * The fields specific to this integration that will be included in the
   * integration instance configuration UI and in the instance's encrypted
   * config in DynamoDB.
   * 
   * @deprecated - use authSection and configSections instead
   */
  configFields: ConfigField[];
  /**
   * The fields specific to this integration that will be checked for uniqueness
   * when a user attempts to create an integration instance.
   */
  uniqueFields?: string[];
  /**
   * The type of the integration, transferred to entity data created by the
   * integration.
   */
  integrationType: string;
  /**
   * The class of the integration, transferred to entity data created by the
   * integration.
   */
  integrationClass: string[];
  /**
   * Url used exclusively in the GitHub integration to initiate oAuth
   * @deprecated
   */
  offsiteUrl?: string;
  /**
   * Title for the button used to initiate an oAuth workflow for the Github integration in the J1 UI
   * @deprecated
   */
  offsiteButtonTitle?: string;
  /**
   * Query for checking the status of oAuth authentication for the Github integration
   * @deprecated
   */
  offsiteStatusQuery?: string;
  oAuth?: {
      /**
       * The url path that will be used to generate a url that, when followed, will initiate an oAuth flow
       * NOTE: The existence of this URL indicates to the UI that this integration will need oAuth authentication
       */
      oAuthUrlGeneratorPath?: string;
  };
  /**
   * When set to "true", this integration will have the beta indicator in the UI.
   */
  beta?: boolean;
  /**
   * The link that will be shown in the J1 UI that points to the repository of
   * the integration.
   *
   * e.g. https://github.com/JupiterOne/graph-slack
   */
  repoWebLink?: string;
  environments?: IntegrationDefinitionEnvironment[];
  /**
   * True if this integration definition is currently paused from invocation
   *
   * When true, the `jupiter-scheduler-job` will re-enqueue integration messages
   * from this integration definition continuously (with a short delay) until
   * the pausing has ended. Additionally, the `jupiter-integration-service` will
   * reject any public or private API call to directly invoke an integration
   * that has this integration definition ID.
   */
  invocationPaused?: boolean;
  integrationPlatformFeatures?: {
    supportsChildInstances?: boolean;
  };
}

interface ConfigField {
  /**
   * The unique, camel-case identifier for the field. Used as the key in the
   * config object.
   */
  key: string;
  displayName: string;
  description: string;
  /**
   * Determines how the raw JSON values stored in the integration instance
   * configuration are interpreted in the UI.
   *
   * `array` is always treated as `string[]`.
   */
  type?: 'string' | 'boolean' | 'number' | 'array' | 'multiSelect' | 'textFileUpload';
  /**
   * Determines what validator the UI runs against the value input by the user.
   */
  format?: string;
  /**
   * The default value of the field. This will be placed into the config when a
   * value is not present or provided, so that the integration will receive the
   * default value.
   *
   * `string[]` supports `type: 'array'`.
   */
  defaultValue?: string | number | boolean | string[];
  /**
   * Indicates to the UI that if this value is changed, it should initiate
   * refetching oAuth credentials as the current credentials are now invalid.
   */
  triggerOAuth?: boolean;
  /**
   * Whether or not the field contains user secrets. If it does, the value is
   * not returned to the UI so that user secrets are never available in the
   * UI source.
   */
  mask?: boolean;
  optional?: boolean;
  /**
   * A hint that is displayed in miniature below the input field. Keep it short!
   */
  helperText?: string;
  /**
   * A prefix appended at the beginning of an input field (E.G. "https://"). Use
   * with the string type.
   */
  inputAdornment?: string;
  /**
   * Whether or not the field is immutable. Only set this to true if there is a
   * config generator in the UI that will fetch and set the value for the field.
   * Otherwise, it will never have a value.
   */
  immutable?: boolean;
  /**
   * Whether or not the value for this field should be computed from other
   * fields in an instance creation lifecycle hook. Setting this to true hides
   * the field on the instance configuration page.
   */
  computed?: boolean;
  /**
   * If the "type" of "ConfigField" is "multiSelect", then each value inside
   * of the "options" array should be displayed in the client.
   */
  options?: ConfigFieldOption[];
  /**
   * The fields that will be displayed under this field in the integration
   * instance configuration UI once a value is provided for this field.
   */
  configFields?: ConfigField[];
}

interface ConfigFieldOption {
  value: string;
  description?: string;
  label?: string;
  webLink?: string;
  /**
   * When set to `true` the client should mark this config option as checked
   */
  default?: boolean;
}

interface ConfigSection {
  displayName: string;
  description?: string;
  configFields: ConfigField[];
}

interface IntegrationDefinitionEnvironment {
  name: string;
  value: boolean;
  accounts?: string[];
}