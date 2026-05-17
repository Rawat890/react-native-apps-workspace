import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import RootNavigator from './navigation/RootNavigator'

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <RootNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App