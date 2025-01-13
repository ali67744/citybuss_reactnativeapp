import React, { useEffect, useRef, useState } from 'react'
import {
	Text,
	TextInput,
	StyleSheet,
	View,
	Animated,
	Easing,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native'
import Colors from '../theme/Colors'
import Entypo from 'react-native-vector-icons/Entypo'

type Props = React.ComponentProps<typeof TextInput> & {
	label: string
	errorText?: boolean,
	password: boolean,
	inputNumber:boolean,
	passwordshow: boolean,
	_onHide: () => void,
}

const TextField: React.FC<Props> = (props) => {
	const {
		password = false,
		passwordshow = false,
		label,
		errorText = false,
		value,
		style,
		inputNumber = false,
		onBlur,
		onFocus,
		_onHide,
		...restOfProps
	} = props
	const [isFocused, setIsFocused] = useState(false)

	const inputRef = useRef<TextInput>(null)
	const focusAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(focusAnim, {
			toValue: isFocused || !!value ? 1 : 0,
			duration: 150,
			easing: Easing.bezier(0.4, 0, 0.2, 1),
			useNativeDriver: true,
		}).start()
	}, [focusAnim, isFocused, value])

	let color = isFocused ? '#cdcdcd' : Colors.primaryLight
	if (errorText) {
		color = '#B00020'
	}

	return (
		<View style={[{elevation:0,borderRadius:10,borderBottomWidth:1,borderBottomColor:Colors.primary}, style]}>
			{password ?
				<View
					ref={inputRef}
					{...restOfProps}
					style={{
						flexDirection: 'row', alignItems: 'center',
						borderRadius: 10,
						// backgroundColor: isFocused ? Colors.white : value.length>0?Colors.white:Colors.Tertiary,
						// borderColor: color,
						paddingTop: 14,
						paddingRight:14,
						paddingLeft:14,
						paddingBottom:10,
						borderBottomWidth: 0.1,
						borderBottomColor:Colors.primary
					}}>
					<TextInput
						style={{
							flex: 1,
							color:Colors.black,
							marginTop:20
						}
						}
						ref={inputRef}
						{...restOfProps}
						value={value}
						onBlur={(event) => {
							setIsFocused(false)
							onBlur?.(event)
						}}
						onFocus={(event) => {
							setIsFocused(true)
							onFocus?.(event)
						}}
						
						secureTextEntry={!passwordshow}
					/>
					<TouchableOpacity onPress={_onHide}>
						<Entypo style={{ fontSize: 20, marginRight: 20, color:Colors.light_dark_gray }} name={passwordshow ? "eye" : "eye-with-line"} />
					</TouchableOpacity>
				</View>
				:
				<TextInput
					style={[
						styles.input,
						{
							// borderColor: Colors.primaryLight,
							borderRadius: 10,
							paddingTop: 14,
						paddingRight:14,
						paddingLeft:14,
						marginTop:20,
						paddingBottom:10,

							// backgroundColor: isFocused ? Colors.primaryLight : value.length>0 ? Colors.primaryLight  :Colors.primaryLight,

						},
					]}
					keyboardType={inputNumber?'number-pad':'default'}
					ref={inputRef}
					{...restOfProps}
					value={value}
					onBlur={(event) => {
						setIsFocused(false)
						onBlur?.(event)
					}}
					onFocus={(event) => {
						setIsFocused(true)
						onFocus?.(event)
					}}
				/>}
			<TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
				<Animated.View
					style={[
						styles.labelContainer,
						{
							// backgroundColor: isFocused ? Colors.primary : value.length>0?Colors.primaryLight:Colors.Tertiary,
							transform: [
								{
									scale: focusAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [1, 0.75],
									}),
								},
								{
									translateY: focusAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [24, -12],
									}),
								},
								{
									translateX: focusAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [16, 0],
									}),
								},
							],
						},
					]}
				>
					<Text
						style={[
							styles.label,
							{
								color:isFocused? Colors.primary:'#cdcdcd',
							},
						]}
					>
						{label}
						{errorText ? '*' : ''}
					</Text>
				</Animated.View>
			</TouchableWithoutFeedback>
			{!!errorText && <Text style={styles.error}>{errorText}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		// borderWidth: 1,
		borderRadius: 4,
		fontFamily: 'Avenir-Medium',
		fontSize: 16,
		color:Colors.black
	},
	labelContainer: {
		position: 'absolute',

	},
	label: {
		fontSize: 20,
		color: Colors.Tertiary,
	},
	error: {
		marginTop: 4,
		marginLeft: 12,
		fontSize: 12,
		color: '#B00020',
		fontFamily: 'Avenir-Medium',
	},
})

export default TextField