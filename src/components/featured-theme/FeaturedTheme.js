import { featuredThemePreviewSetting } from "utils/settings";
import styled, { keyframes } from "styled-components";
import theme from "theme";
import { ThemeSummaryCard } from "components/card";
import useImage from "hooks/useImage";
import { useMemo } from "react";
import useSetting from "hooks/useSetting";
import useCompatability from "hooks/useCompatability";

const videoBaseUrl = process.env.NEXT_PUBLIC_VIDEO_URL || "https://animethemes.moe";
const grills = [
    "https://animethemes.moe/img/grill/2.png",
    "https://animethemes.moe/img/grill/3.png",
    "https://animethemes.moe/img/grill/4.png",
    "https://animethemes.moe/img/grill/5.png",
    "https://animethemes.moe/img/grill/6.png",
    "https://animethemes.moe/img/grill/7.png",
    "https://animethemes.moe/img/grill/8.png",
    "https://animethemes.moe/img/grill/9.png",
    "https://animethemes.moe/img/grill/10.png",
];

const slowPan = keyframes`
    from {
        object-position: top;
    }
    50% {
        object-position: bottom;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(10%);
    }
`;

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 200px;
    
    position: relative;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        margin-inline-start: -16px;
        margin-inline-end: -16px;    
        border-radius: 0;
    }
`;

const StyledOverflowHidden = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
`;

const StyledThemeSummaryCard = styled(ThemeSummaryCard)`
    position: absolute;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        left: 16px;
        right: 16px;
    }
`;

const StyledVideo = styled.video`
    width: 100%;
    filter: blur(5px);
`;

const StyledCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
    animation: ${slowPan} 60s ease-in-out infinite;
`;

const StyledGrillContainer = styled.div`
    position: absolute;
    
    height: 130%;
    bottom: 0;
    right: 32px;
    overflow: hidden;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

const StyledGrill = styled.img`
    max-width: 300px;
    height: 100%;
    object-fit: contain;
    object-position: bottom;
    animation: ${slideIn} 2s 5s backwards cubic-bezier(0.34, 1.56, 0.64, 1);
    
    transition: transform 1s;
    transform: translateY(10%);
    
    &:hover {
        transform: none;
    }
`;

const Box = styled.div``;

export function FeaturedTheme({ theme }) {
    const featuredVideo = theme.entries[0].videos[0];
    const { smallCover: featuredCover } = useImage(theme.anime);
    const grill = useMemo(() => grills[Math.floor(Math.random() * grills.length)], []);
    const [ featuredThemePreviewSettingValue ] = useSetting(featuredThemePreviewSetting);
    const { canPlayVideo } = useCompatability({ canPlayVideo: false });

    const FeaturedThemeWrapper = featuredThemePreviewSettingValue !== "disabled"
        ? StyledWrapper
        : Box;
    const FeaturedThemeSummaryCard = featuredThemePreviewSettingValue !== "disabled"
        ? StyledThemeSummaryCard
        : ThemeSummaryCard;

    return (
        <FeaturedThemeWrapper>
            {featuredThemePreviewSettingValue === "video" && canPlayVideo && (
                <StyledOverflowHidden>
                    <StyledVideo
                        src={`${videoBaseUrl}/video/${featuredVideo.basename}`}
                        autoPlay
                        muted
                        loop
                    />
                </StyledOverflowHidden>
            )}
            {featuredThemePreviewSettingValue === "cover" && (
                <StyledOverflowHidden>
                    <StyledCover src={featuredCover}/>
                </StyledOverflowHidden>
            )}
            {featuredThemePreviewSettingValue !== "disabled" && (
                <StyledGrillContainer>
                    <StyledGrill src={grill}/>
                </StyledGrillContainer>
            )}
            <FeaturedThemeSummaryCard theme={theme}/>
        </FeaturedThemeWrapper>
    );
}