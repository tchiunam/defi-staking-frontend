import { Contract } from "@ethersproject/contracts"
import { useContractFunction, useEthers } from "@usedapp/core"
import { constants, utils } from "ethers"
import { useEffect, useState } from "react"
import MockERC20 from "../chain-info/contracts/MockERC20.json"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"

export const useStakeTokens = (tokenAddress: string) => {
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = MockERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)

    const { send: approveErc20Send, state: approveAndStakeErc20State } =
        useContractFunction(
            erc20Contract,
            "approve",
            { transactionName: "Approve ERC20 transfer" }
        )
    const approveAndStake = (amount: string) => {
        setAmountToStake(amount)
        return approveErc20Send(tokenFarmAddress, amount)
    }
    const { send: stakeSend, state: stakeState } =
        useContractFunction(
            tokenFarmContract,
            "stakeTokens",
            { transactionName: "Stake Tokens" }
        )
    const [amountToStake, setAmountToStake] = useState("0")

    useEffect(() => {
        if (approveAndStakeErc20State.status == "Success") {
            stakeSend(amountToStake)
        }
    }, [approveAndStakeErc20State, amountToStake, tokenAddress])

    const [state, setState] = useState(approveAndStakeErc20State)

    return { approveAndStake, state }
}