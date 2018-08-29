export class CardConfig {
  /**
   * Should be number with unit.
   * e.g - '100px'. Default value auto
   */
  height?: string;

  /**
   * Should be number with unit.
   * e.g - '200px'. Default value 100%
   */
  width?: string;

  /**
   * Should be in hexadecimal format.
   * Default value  #ffffff
   */
  cardColor?: string;

  /**
   * boolean value whether true or false.
   * Default false
   */
  shadow?: boolean;

  /**
   * should be informat of
   * 'none|h-offset v-offset blur spread color |inset|initial|inherit'
   */
  shadowValue?: string;

  /**
   * boolean value whether true or false.
   * Default false
   */
  border?: boolean;

  /**
   * should be
   * 'border-style:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit'
   * default 'none'
   */
  borderStyle?: string;

  /**
   * should be color in hexadecimal format.
   */
  borderColor?: string;

  /**
   * Should be number with unit.
   * eg - '1px'
   * Default 0.
   */
  borderWidth?: string;

  /**
   * boolean value whether true or false.
   * Default value false.
   */
  borderRadius?: boolean;

  /**
   * Should be number with unit.
   * eg - '5px'
   * Default 0.
   */
  borderRadiusValue?: string;

  /**
   * Should be number with unit.
   * This should be shorthand format
   * Default value 0 0 0 0
   */
  margin?: string;
}

export const defaultCardConfig = {
  height: 'auto',
  width: '100%',
  cardColor: '#ffffff',
  shadow: false,
  shadowValue: '0 0 0 #fffff',
  border: false,
  borderStyle: 'none',
  borderColor: '#ffffff',
  borderWidth: '0',
  borderRadius: false,
  borderRadiusValue: '0',
  margin: '0 0 0 0'
};
