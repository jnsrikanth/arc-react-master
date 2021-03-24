

export interface NavigatorPropsType {
    dispatch: Function,
    onSelectTabOption(selectedCode: string): void
    selected: string
    authData?: any
}