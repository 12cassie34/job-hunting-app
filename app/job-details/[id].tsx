import { useCallback, useState } from "react";

import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, RefreshControlComponent } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import { COLORS, icons, SIZES } from "../../constants";
import useFetch, { EndPoint } from "../../hook/useFetch";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";

export enum DetailTab {
    "About" = "About",
    "Qualifications" = "Qualifications",
    "Responsibility" = "Responsibility"
}

const tabs = [DetailTab.About, DetailTab.Qualifications, DetailTab.Responsibility];

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<DetailTab>(tabs[0]);

    const { data, isLoading, error, refetch } = useFetch({
        endPoint: EndPoint.JobDetails,
        paramsValue: {
          job_id: params.id
        }
      });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);
    const onChangeActiveTab = (tab: DetailTab) => {
        setActiveTab(tab);
    }

    const displayTabContent = () => {
        switch (activeTab) {
            case DetailTab.About: {
                return (
                    <JobAbout
                        info={data[0].job_description ?? 'No Data Provided'}
                    />
                )
            }
            case DetailTab.Qualifications: {
                return (
                    <Specifics
                        title={DetailTab.Qualifications}
                        points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                    />
                )
            }
            case DetailTab.Responsibility: {
                return (
                    <Specifics
                        title={DetailTab.Responsibility}
                        points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                    />
                )
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension='60%'
                    handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
                ),
                headerTitle: "",
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                {isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                    <Text>No data available</Text>
                ) : (
                    <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                    <Company
                        companyLogo={data[0].employer_logo}
                        jobTitle={data[0].job_title}
                        companyName={data[0].employer_name}
                        location={data[0].job_country}
                    />
                    <JobTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onChangeActiveTab={onChangeActiveTab}
                    />
                    {displayTabContent()}
                    </View>
                )}
                </ScrollView>
                <JobFooter url={data[0]?.job_google_link ?? 'https://careers/google.com/jobs/results'} />
      </>
    </SafeAreaView>
    )
}

export default JobDetails;