import { nowrap } from '@patternfly/react-table';
import { complianceScoreString } from 'PresentationalComponents';
import { profilesRulesFailed } from 'Utilities/ruleHelpers';
import { renderComponent } from 'Utilities/helpers';

import {
    Name as NameCell, ComplianceScore as ComplianceScoreCell, DetailsLink as DetailsLinkCell,
    FailedRules as FailedRulesCell, LastScanned as LastScannedCell, Policies as PoliciesCell,
    SSGVersions as SsgVersionCell, complianceScoreData, lastScanned
} from './Cells';

const disableSorting = { isStatic: true };

const operatingSystemString = ({ osMinorVersion, osMajorVersion }) => (
    `RHEL ${osMajorVersion}.${osMinorVersion}`
);

export const Name = {
    title: 'Name',
    props: {
        width: 40,
        ...disableSorting
    },
    renderExport: (system) => (
        `${ system.name } (${ operatingSystemString(system) })`
    ),
    renderFunc: renderComponent(NameCell)
};

export const customName = (props) => ({
    ...Name,
    props: {
        ...Name.props,
        ...props
    },
    renderFunc: renderComponent(NameCell, props)
});

export const SsgVersion = {
    title: 'SSG version',
    transforms: [nowrap],
    props: disableSorting,
    exportKey: 'testResultProfiles',
    renderExport: (testResultProfiles) => (
        testResultProfiles.map(({ supported, ssgVersion }) =>(
            `${ !supported ? '!' : '' }${ ssgVersion }`
        )).join(', ')
    ),
    renderFunc: renderComponent(SsgVersionCell)
};

export const Policies = {
    title: 'Policies',
    transforms: [nowrap],
    exportKey: 'policies',
    renderExport: (policies) => (
        policies.map(({ name }) => (name)).join(', ')
    ),
    props: {
        width: 40,
        ...disableSorting
    },
    renderFunc: renderComponent(PoliciesCell)
};

export const DetailsLink = {
    title: '',
    export: false,
    props: {
        width: 20,
        ...disableSorting
    },
    renderFunc: renderComponent(DetailsLinkCell)
};

export const FailedRules = {
    title: 'Failed rules',
    exportKey: 'testResultProfiles',
    transforms: [nowrap],
    props: {
        ...disableSorting
    },
    renderExport: (testResultProfiles) => (
        profilesRulesFailed(testResultProfiles).length
    ),
    renderFunc: renderComponent(FailedRulesCell)
};

export const ComplianceScore = {
    title: 'Compliance score',
    exportKey: 'testResultProfiles',
    transforms: [nowrap],
    props: {
        ...disableSorting
    },
    renderExport: (testResultProfiles) => (
        complianceScoreString(complianceScoreData(testResultProfiles)).trim()
    ),
    renderFunc: renderComponent(ComplianceScoreCell)
};

export const LastScanned = {
    title: 'Last scanned',
    transforms: [nowrap],
    exportKey: 'testResultProfiles',
    props: {
        ...disableSorting
    },
    renderExport: (testResultProfiles) => (
        lastScanned(testResultProfiles)
    ),
    renderFunc: renderComponent(LastScannedCell)
};

export const OperatingSystem  = {
    title: 'Operating system',
    transforms: [nowrap],
    props: disableSorting,
    renderExport: (cell) => (
        operatingSystemString(cell)
    ),
    renderFunc: (_data, _id, system) => (
        operatingSystemString(system)
    )
};
