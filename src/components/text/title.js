import React from 'react';
import {Text} from 'react-native';
import {textStyle} from 'style';

export default function Title({children, ...props}) {
  return (
    <Text style={textStyle.title} {...props}>
      {children}
    </Text>
  );
}
