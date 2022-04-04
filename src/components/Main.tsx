import { useEthers } from "@usedapp/core"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import helperConfig from "../helper-config.json"
import daiImage from "../images/dai.png"
import ethImage from "../images/eth.png"
import tngImage from "../images/tng.png"
import { TheWallet } from "./theWallet"

export type Token = {
    image: string
    address: string
    name: string
}

export const Main = () => {
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "ganache"
    const tregonaiTokenAddress = chainId ? networkMapping[String(chainId)]["TregonaiToken"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        {
            image: tngImage,
            address: tregonaiTokenAddress,
            name: "TNG"
        },
        {
            image: ethImage,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: daiImage,
            address: fauTokenAddress,
            name: "DAI"
        }
    ]

    return (<TheWallet supportedTokens={supportedTokens} />)
}