import React, { useState, useEffect } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import CustomModal from "../Modal";

export default function Footer() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  return (
    <>
      <div
        className={`w-full flex flex-col justify-center items-center z-50 gap-2 text-white fixed bottom-0 py-4 bg-black/10 backdrop-blur-sm`}
      >
        <div className="flex items-center justify-center gap-4">
          <DocumentTextIcon
            color="white"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <a
            href="https://github.com/USDEBT51923/TokenMintRedeem/blob/main/README.md"
            target="_blank"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACUCAMAAAAqEXLeAAAAaVBMVEUAAAD////t7e3u7u7s7Oz29vb5+fn8/Pzy8vLp6enm5ubc3Nx8fHycnJwqKirHx8e+vr44ODjU1NTNzc10dHQaGhqpqamzs7NOTk5FRUWTk5M+Pj4MDAyFhYVnZ2dUVFRcXFwjIyMxMTHjGv4nAAAP3UlEQVR4nL1cC3uqPAymlF4AEQaKE6/b//+RpzegSYu6TU6+5/k8U2ND26TJ2yQJIYRnacbVq3qR6oWmaapemPpTECLUCzMfppLw7pq8ga4dJzJNs3AUNTRVLzIzH46CJfrfKU2NkDTVX5SU6i+ylFp2+y6lkte7d4ioaVdzGR+FSveuJ5gRMjNf1JNlhLRP476o2M0zSlbe9u+SMUn2nyUz4sCxqV4vMLYRknPOpJRMvboX/WfwLmk375PQ0qYlj8b2REhSuxG9XWAfLHMPZiZVyurj3TImyUelZPBGsSIIqCFKsDRxu0DtkNTuAisk2CK8e0XE/fb7dHR0+t6+sjc+Wg6VQAvpNmI6CUbnmcw8ZSO5U7YsU+xseDbYcTdUfdOVVBC1QpIIWnZNXw274zPOQQ1Ds8yZk5x45iSbZ1IIYXaAeqVq9tWLHsa+S9W7XJSPR9pe6rLImH54bn/IvOg/WVaU9WX7+PlKoVnCsYX9If0u0G5nglLfOPAH03i+bQ56/hetllkwkh02t/ODyeQ+S1S7w40IRpTLpvG7qqlSwEem1e4qpaG0fqB5O7lkJzPPTtJpq/ojalVql5Z6f68l3N2WxQiZwhGpGVHW9yVdOrZ6Ct3YHstkzKf96RQns4qTmc17WPrVqphYOGSxumZ+SC+YepfbD9UoebX0zIeQxRPsoQnqF2axLwVgSaHVWrYnouy/4r/ZPzFBZqu6894z5pzHz5jTQR27cZZHltmOohyAwyn6sxvO4yxKwIQtEM+jMm6rVCyxvEYiraJGaZPzJZYknAvrYLCoU7YpmPSdqJkl4t25RWLQ78okK6LPf2WzgwEndclVk7FF+Wyx3j3x7mJ+V6ZtSHuLbST50FXLcgH0ScrYPFbSfJg7FqSCVj9zIyRWdMfiaS2rYnMpJWARjkVrN5wLdf4SeY88ZyvUd5DeEWFYuFFKCo2j/iGehixmFEnayFrdpWVhSLvdQQRMEI8cMxd7LLg1tnq34DhBl9nZk5Elm1jkJRxlxz0WZ0M8If0RI8f14I34JiEJiSz5EGGhifM7pPU7tPsR4f3otJc0uio0YIn7MfwJi4j5qRUJWKRvgpwTGZ6Ft9J373LPnuQuwJy8UaM4+eQR0kUWq2tlqOUHAlzLuAlqA1P7mRPsLfzVBE0s+ScebdsumCDPmGeBD3DnYrbMaFrGQOSJMY+zmE3L73i8YxYYc3MEcj6+kMBAXpnaQ/ZDab8kIYv9E3/4KosIj7YrQSyeg6HnIlSaq1mw1HeUswWfJPUdjHTBW4iwBFJWxFu6NIgWW+xJ3TkJnKgMe3cp9OtlyDJb5ixkCVb8q0XGHBxsAivbZ2F3lT2lcnsW5hOL2Wu5PVRnpzf9IYsssPbcBHR6yXwQ5xyfAZ/cOMrAnoCz2w1O4dm9xJJBeWcWjqW8cPcwgQmSHZ728rk9+YUJirCUeJt1MjBB9pTK8Q4+kBmwokrbvBFHHaIY4/KFBOiTx2Le1SDCDFjhE+Sae5rqAVZBSNMLPkNJ8tAf6q7UQeyLGJd+iaBP+tBjbd1Xh9oDrEQwOJl/aIZZaIoizqsfsMjavHe6DqVaqRcwrkX0Sa3tcLWrW1CPBS3jPqURwArHXafc31Wz3p+/D/mICMRN0AP0Scq8P01oRsU8lhz5lxseAlayg3v3XBPPt6aFj5NsddiNZ9J5FXRkAS6Cm0nRDf5yXbPUseinrSEU89XJELBC5mfjoU9M4I19GrjgM6I0+2dy8V0mRYrAq1NJPBa8lJcAsCIt/MYXUtUwvuupv8ZmA4g0L7RkRZEzT4HtypMi9KUbOAqyQy1BgBW5P2SPBbi3ehKS5G19qKphs7ta2l2GSqlvaWS1Z2EfgViq0Um3ozTw0zvxASsVFxXw842YhDToUxmLcM8bNYHqv8Pl8yMG7J6/vk+3oVOBtiRFNIy/Cu6PItB6FdLNpDsiYei1byUISiV6xomaZvMAeXT0MTSxAFY/BgW6Jlv4qLvx7LZWpoTBxkXAg21RyL8SslpIez9KAFjBJz1rvw/cPizga3+mEtr/VMJ1qXzASn7DzzB0xBeW6+9C8ocDfcsZsEKr+dEi0IgtIZVvEBKBZWjfNXLSbgGtw8ADl2YtIQuOHCd0j3AUo5CihDuhoKM7Skb0aQmX/itRDyyzmgpt4dlgylq70UbYEWHRJ2G1W6yo3ZkeRbpRNMYlkDGsuAWsKIWGtiQEXdsx56i9nc74gkW9lOAbV2qFlDBEvMmIkO0K95+JhvpCISUIBr9aaQArBrWiJxH0KXtLxkBAFQsxLqSkPbOAFRDgo5QoKDXG4ekd6K+oGzEuLyBGVuhqtVsAvls89MOB5Fvos4gGmDD4F0ZIqBSNjz5NxpzwN6Y2TLSb7679CAmakloDVgQe6jKGPjH59uQGTede+DDWNBj40oWwJOXguDnyWN7G82v5X1ItIgEmlihNZAmci4pF0huwy/w+2hdhgJnB65PvUiayAbutlkjZTCQTvw58B6kQYE5vcOYEHh37RpkgIPax0Dyj4tibo3SdDenowHyYXfmxalYKsN6V0m6gNzsWok+yex4h/J72LA0wLgbO74vSbmDK9XUNzrAKQMv3UsVCjAvo6ZUlBbDvPcFZTpyhiPzddCo4xrjgyfhRJECEr04i26q2yJo7UlOjdj/EuBDk0ybgvPvOZJBhVazjAM20yzDGJTNgFrsE+NwnEmRYsbWc8plKijEuAmzeIQHLfyTTvrA4k3pZe7U1oGz3pJhwVwJsUJ8ARdoQgjOssoX0kzfSLciwgnowJMAkDYRgO4lAolUozByDU5cAI9gLMl8UWiHX35IqPJ2uI52vARH0WwJ0txY4Xeo/bEm1KSVKyhLg9P5IwJYrBUoDSFc+bixVDMHsAoSMXwnwgYrgKgGjr6vQheMLC6AJ+wQ4D0WQ5ETWdC5G2hAMkAEhkQgIidMP9n+ExLdA5YNvl+Gt3/8REl9HIiGBEFZI4Cj/r5nMwC0QEPKM96TGr3S+C6Um7YWK/yHkjhsEwwBWwoiA9iTSbmyC/s9McuBl0xRrN7ijCu0kWQMUeCqkAF7uNgFOUSOozX1SLwZKomS9QHGmwS23TS7XLyCGPiV3/09zdsMIcx04DVKPY2h4dt8T6BSFXlAkNe/t1Dz2gi7Qn9wRzwuyxnwtSN+nEhtzuH4D9swtamTPJvO/1RAWjzI32DQq9szhFtUQAgCs6KMD6k10JihaTKG6NjBa3BZBtFjAy7I16C5SFC0WwDC2QdyN0qXS7G3Fa4s0MJSUJWtgndskBclNFcElgSuh5T6VQUkgANE+0wSDQ9gErR/knPMgEEMgWoLAIYlDWrLSFY43JsOAlUQgWgIN4bYUGLDia585JpHLB6wEzFzrSYI2aS0DwGrl9d62U5q+M0HwJnNfywQBUhceYubrCnkNMHOYIflRyARhpF8czKR5xnVD7yZIyuLwrlNkCUc2JhcwWY9Ltspt2ERCIhBVCeXTQHiC726rMBmSrjmVPbyT0doNZ62wmQPgvcjdIuvWc88/i/BuEebOEiskmKhty4LMdpxs90Y6MJA/r2cSlgxoNDLJkMZbxxfV98m1vAzjwFJQRYhWu5EmwwpdMB8pNkE6B2OdoPG7CDMHKHDTPkppM6wQvFeTAPVIo9VSfyZlp0NcB95sb5jLsEJJv58IPrK+8hoa3gjm+eQOIYNq0wuXYSVyuJitDC/lSfp+v7L3HMJxFAmvts7Gu7UZVlCAK4MmyKbmxUq6/kQHFo5CUTbpbsqw4hSeKV+dX/Aw1vdR9l4pG+ZVIoyAFU5/7kytnq4RY4RB0HmYEAyXDGOwBeX/vs+on1oiwlEkssg3ptOFpau2Q4Gr0vtI9YJg5f09Iu4vJroOUtMlik0bUBIIr8GTq4gKmcm0edxB4DW614xG8+cF3JE6RcAJSdVc43CrYQ6fpA45TC1yKAWLZTn/hPa3jruSwJQ6WMyNwtCCDsR8SF09DmXoWaUXYYKODymnhxeSjZfo+1IzGZbf2nMYV8cyCutxMDDVLxfXpISX/e+is3tdELlcwoNwpwvBJYE52mwpR8Z8Kgk0XoDI+93nT/bnx33XmLz5aBWhKc2Hzm6yzUFJoDn80K684vMKX7UobesO1S4ojgzpfN9Uh5aRxyX2HC/2MAkwlQTilF9zaMUL1+cGApJwlhfdoxOzKgulHdJtxEdVhGixlf8TlASmHH3p3AUmKFoSKJ54SCbT62FJoN2eOJLq+VjT7ZUEphLZlhOudYdNLcYqulgBNH5YXBKYAVjM4t8InD/KFJUE2joInLh7NXU+rpBtKshEVWkvJPO3MlLINimOBXMoxklqj8UvCaTYgxgrzx/U9+GDLEZHc539sCQwwO4uPotfEigLbKTrWUhU6z5Oy0u3Ez2LzST18hPwIp4LSkBJoMlbMakkIgDIW+LCdgFyXKbsE1a/cvjonkAji3C/x7zfw2VV2mf3R0E9rHCQ8N2ymAmaWV6DWGuZxaoIXfYRa3EwugGj4KrkAnsPJgtz0QTRWC+KCG3YIxNUYDdVez/xHlb2uAtS87/zpfo+xULLF10NHu05ZmeyCE7XmqCZRNWlodU7Fnyx5jTcxAskxVINKy+C28uK4L5qnnab2Y804Cn9ngNQu18Nx7slOylCE7bhCz2sPAsWdkb46mY7KaGdfDU2a5bsZBdkyxyzxe4N3l4Ln+2rNtm2ke4Nrwbjfdi9wWzPJszoKUnYByPsYUXaMCgcwoZUmoW9KmTF/FF0BbzZX6EB27fkxR5WESj/ymMmKNZpJi7k5NJ4Jih2r3F40sMqnY1DRB+ObaRfxA9mMmwxEWuHVs1rnKIeVrbwQLoXbVpiB0nF3D3z3Ebj9ZkU0yjjTXXMMAwi2t8j0sNKu+NRbPdaBIrz6kVUhRvIRGtrL0JG6+wX241GD+WKcdhA5idCzjuaxws+Lo/bjTplc6CRTRSJ/s6t4dJvavGjmczGbmCHaL6j9l5pvIcVqmqntnCdBqVjjs73gswsP9DuaRRS3qMHfj/2c4w0NYq1h3Irf4jnTu5ayRzLj7Wb0YUmul/NckepeKOtqb9R3MfZ7xryOyFJs4v/5LkloZB+oy1Tfjn2H9NdHh2UpE/Ipfyqz1oqV+UHQqrlJrJZQhJO5ix0sBisPvUAqzHCdN1gppSIZQx6O3T8dcXpCa+HRVTmItHFkYQx9LOOx0E7kpn29yF/dSYv1WKHTJN89krH40hDwtGgkm7l/OibdgT9gyRizB+CSOZi5e3XDoDUUj8VIe5goBuxt2DQUdo2BN+IxZpkvtLxWMjLKpfJ+4sUUAlIvN1otDkjvqWlsru/X8Z7J/0GMgv4NwKsssmux27EDn8E9DEdDzIcxbUzROHe603XGV1sYPsbESsauxx8YIJe7JrF0sO7rr17yn7Qm+sfumvrWJ8Lni0AAAAASUVORK5CYII="
            />
          </a>
          <a href="https://x.com/USDebtCoin" target="_blank">
            <img
              className="w-8 h-8 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT3IEKSLJNBSOp6Xh43WaY90iIq-ALPhxkwA&usqp=CAU"
            />
          </a>
        </div>
        <div className="cursor-pointer" onClick={() => setOpen2(true)}>
          How to Use
        </div>
      </div>
      <CustomModal open={open} setOpen={setOpen}>
        <h1 className="font-bold text-center">Terms of Use</h1>
        <div className="text-justify">
          This specific contract is crafted to work with wrapped Wormhole/Portal
          bridge USDEBT tokens, facilitating the creation of genuine USDEBT SPL
          tokens. Additionally, it allows for the conversion of USDEBT SPL
          tokens back into Wormhole/Portal bridge USDEBT tokens. The USDEBT
          Wormhole tokens serve as wrapped assets, enabling the transfer of
          USDEBT supply between the Solana and Ethereum blockchains. THIS
          INTERFACE, THE WORMHOLE/PORTAL BRIDGE, AND THE USDEBT MINTING CONTRACT
          ARE MADE AVAILABLE "AS IS", WITHOUT WARRANTIES OF ANY KIND, EITHER
          EXPRESSED OR IMPLIED, AND USERS ENGAGE WITH THEM AT THEIR OWN RISK. By
          interacting with this Interface, using the token bridging service, or
          participating in the minting of USDEBT SPL tokens, you acknowledge
          that no developer, entity, or individual involved in the creation,
          deployment, maintenance, or operation of this Interface, the
          Wormhole/Portal bridge, or the USDEBT minting contract, as well as
          those supporting these operations, will be held liable for any form of
          claim, damage, or loss incurred as a result of your engagement with
          these services. This includes, but is not limited to, any direct,
          indirect, incidental, special, exemplary, punitive, or consequential
          damages, or losses of profits, cryptocurrencies, tokens, or any other
          assets of value. By using this Interface, you also represent and
          warrant that you are not under any sanctions or restrictions, nor are
          you listed on any prohibitions or restrictions lists, including but
          not limited to those maintained by the United States' Department of
          Treasury's Office of Foreign Assets Control, the United Nations
          Security Council, the European Union or its Member States, or by any
          other government authority.
        </div>
      </CustomModal>
      <CustomModal open={open2} setOpen={setOpen2}>
        <h1 className="font-bold text-center">How to Use</h1>
        <div className="flex flex-col gap-2">
          <h2>1. Bridging from Ethereum to Solana</h2>
          <div>
            Bridge USDEBT from Ethereum to Solana through PortalBridge.com. In
            this step, your USDEBT ERC-20 coins lock into the portal bridge
            smart contract, and a new Portal wrapped USDEBT token gets minted on
            Solana. This newly wrapped Portal token is referred to as USDEBT
            (Wormhole). You will notice the USDEBT Wormhole token logo as : Go
            to{" "}
            <a href="https://portalbridge.com/">
              <u>https://portalbridge.com/</u>
            </a>
          </div>
          <h2>2. Mint authentic USDEBT Solana (SPL) coins</h2>
          <div>
            In this step, your USDEBT (Wormhole) tokens locks into the USDEBT
            Solana minting contract, and new authentic USDEBT Solana coins are
            minted. These coins represent the authentic USDEBT coins that are
            transacted throughout the Solana ecosystem. You will notice the same
            USDEBT logo as Ethereum, but the contract address on the Solana
            network is <i>5gAfJFu2nDUjceQJ4uKnkNEN94xEiF6JW3XyaEdyFd9p</i>.
            <br />
            Congratulations! You have now bridged your USDEBT Ethereum coins to
            Solana!
          </div>
        </div>
      </CustomModal>
    </>
  );
}
