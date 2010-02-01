/**
 * module.js
 * @author Mod-PaV
 * Tools allowing modules to register and listen for events,
 * such as particular page loads.
 */
////////////////////////////////////////////////////////////////////////////////
/** Hattrick pages that modules can run on.
 * Those values are simply taken from the hattrick URL, so when the current
 * url contains e.g. "Forum/Read" AND we are on hattrick, all the modules
 * registered to listen to "forumViewThread" will have their run() functions
 * called.
 * You can add new values here, just remember to escape slashes with
 * backslashes (as you can see below).
 */
 
if (!Foxtrick) var Foxtrick={};
 
Foxtrick.ht_pages = {
    'all'                       : '',
    'playerdetail'              : '\/Club\/Players\/Player\.aspx',
	'youthplayerdetail'         : '\/Club\/Players\/YouthPlayer\.aspx',
	'myhattrick'                : '\/MyHattrick\/$',
	'myhattrickAll'             : '\/MyHattrick\/',
    'forum'                     : '\/Forum\/',
    'forumViewThread'           : '\/Forum\/Read',
	'forumOverView'             : '\/Forum\/Overview', 
	'forumDefault'              : '\/Forum\/Default',
    'forumWritePost'            : '\/Forum\/Write',
    'forumModWritePost'         : '\/Forum\/Functions',
//	'mailnewsletter'            : '\/MyHattrick\/Inbox\/Default.aspx\?actionType=newsLetter',
    'messageWritePost'          : '\/MyHattrick\/Inbox/',
    'forumSettings'             : '\/MyHattrick\/Preferences\/ForumSettings\.aspx',
    'prefSettings'              : '\/MyHattrick\/Preferences\/ProfileSettings\.aspx',
    'bookmarks'                 : '\/MyHattrick\/Bookmarks',
    'league'                    : '\/World\/Series\/Default\.aspx',
    'youthleague'               : '\/World\/Series\/YouthSeries\.aspx',
    'country'                   : '\/World\/Leagues\/League\.aspx',
    'region'                    : '\/World\/Regions\/Region\.aspx',
    'challenges'                : '\/Club\/Challenges\/$',
    'youthchallenges'           : '\/Club\/Challenges\/YouthChallenges',
    'economy'                   : '\/Club\/Finances\/',
    'achievements'              : '\/Club\/Achievements\/',
    'history'                   : '\/Club\/History\/',
    'teamevents'                : '\/Club\/TeamEvents/',
    'youthoverview'             : '\/Club\/Youth\/Default\.aspx',
    'arena'                     : '\/Club\/Arena\/Default\.aspx',
    'staff'                     : '\/Club\/Staff',
    'fans'                      : '\/Club\/Fans',
    'coach'                     : '\/Club\/Training\/ChangeCoach\.aspx',
    'transfer'                  : '\/Club\/Transfers\/$',
    'TransferCompare'           : '\/Club\/Transfers\/TransferCompare',
    'transfersTeam'             : '\/Club\/Transfers\/transfersTeam.aspx',
    'TransfersPlayer'           : '\/Club\/Transfers\/TransfersPlayer.aspx',
	'TransferSearchResults'     : '\/World\/Transfers\/TransfersSearchResult.aspx',	
    'match'                     : '\/Club\/Matches\/Match.aspx',
    'matches'                   : '\/Club\/Matches\/.TeamID=|\/Club\/Matches\/$|\/Club/\Matches\/Default|\/World\/Matches\/$',
    'matchesarchiv'             : '\/Club\/Matches\/Archive.aspx|\/Club\/Matches\/YouthArchive',
    'matchesLatest'             : '\/Club\/Matches\/LatestMatches.aspx',
    'matcheshistory'            : '\/Club\/Matches\/history.aspx',
    'matchLineup'               : '\/Club\/Matches\/MatchLineup.aspx',
	'matchesLive'				: '\/Club\/Matches\/Live.aspx',
    'matchOrders'               : '\/MatchOrders\.aspx',
    'flagCollection'            : '\/Club\/Flags\/',
    'transferListSearchForm'    : '\/World\/Transfers\/$|\/World\/Transfers\/default.aspx',
    'transferListSearchResult'  : '\/World\/Transfers\/TransfersSearchResult.aspx',
    'teamPage'                  : '\/Club\/$|\/Club\/.TeamID=|\/Club\/default.aspx',
    'teamPageAny'               : '\/Club\/',
    'teamPageBrowser'           : '\/Club\/default.aspx',
    'teamPageGeneral'           : '\/Club\/|\/World\/Series\/',
    'oldseries'                 : '\/World\/Series\/OldSeries\.aspx',
    'marathon'                  : '\/World\/Series\/Marathon\.aspx',
    'promotion'                 : '\/World\/Series\/Promotion\.aspx',
    'fixtures'                  : '\/World\/Series\/Fixtures\.aspx',
    'players'                   : '\/Club\/Players\/.TeamID=|\/Club\/Players\/default\.aspx.TeamID=|\/Club\/NationalTeam\/NTPlayers\.aspx|\/Club\/Players\/Oldies\.aspx|\/Club\/Players\/Coaches\.aspx',
    'YouthPlayers'              : 'YouthPlayers\.aspx',
    'YouthPlayer'               : 'YouthPlayer\.aspx',
    'training'                  : '\/Club\/Training\/$',
    'trainingStats'             : '\/Club\/Training\/Statistics.aspx',
    'YouthTraining'             : '\/Club\/Training\/YouthTraining\.aspx',
    'managerPage'               : '\/Club\/Manager\/',
    'finances'                  : '\/Club\/Finances/',
    'federation'                : '\/Community\/Federations\/Federation\.aspx',
    'newsletter'                : '\/Community\/Federations\/SendMessage\.aspx',
    'national'                  : '\/Club\/NationalTeam\/NationalTeam\.aspx',
    'guestbook'                 : '\/Club\/Manager\/Guestbook\.aspx',
    'announcements'             : '\/Club\/Announcements/\New\.aspx|\/Club\/Announcements/\Edit\.aspx',
    'htpress'                   : '\/Community\/Press\/Default\.aspx',
    'cupmatches'                : '\/World\/Cup\/CupMatches\.aspx',
    'cupoverview'               : '\/World\/Cup\/.CupID=',
    'election'                  : '\/World\/Elections\/Default\.aspx',
    'ads'                       : '\/Community\/Ads\/',
	'denominations'             : '\/Help\/Rules\/AppDenominations.aspx',
	'help_contact'              : '\/Help\/Contact.aspx',
	'statsBestgames'            : '\/World\/Stats\/StatsBestgames.aspx',
	'statsTransfersBuyers'      : '\/World\/Stats\/StatsTransfersBuyers.aspx',
	'statsTeams'                : '\/World\/Stats\/StatsTeams.aspx',
	'statsPlayers'              : '\/World\/Stats\/StatsPlayers.aspx',
	'statsRegions'              : '\/World\/Stats\/StatsRegions.aspx',
	'statsNationalTeams'        : '\/World\/Stats\/StatsNationalTeams.aspx',
	'statsConfs'                : '\/World\/Stats\/StatsConfs.aspx',
	'statsBookmarks'            : '\/World\/Stats\/StatsBookmarks.aspx',
	'statsArena'                : '\/World\/Stats\/StatsArena.aspx',
    'press'                     : '\/Community\/Press\/',
    'all_late'                  : '\/',

};
////////////////////////////////////////////////////////////////////////////////